import * as yup from 'yup';
import ContaContabil from '../../models/ContaContabil';
import Empresa from '../../models/empresa';
import RecDesp from '../../models/recDesp';

class ContaContabilController {
  async store(req, res) {
    const schema = yup.object().shape({
      EmpresaId: yup.string().required(),
      cod: yup.string().required(),
      desc: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const { EmpresaId, cod, desc } = await ContaContabil.create(req.body);

    return res.json({
      EmpresaId,
      cod,
      desc,
    });
  }

  async get(req, res) {
    if (!req.params.id) {
      const contContabil = await ContaContabil.findAll({ include: Empresa });
      return res.json(contContabil);
    }
    const contContabil = await ContaContabil.findOne({ where: { id: req.params.id } });
    return res.json(contContabil);
  }

  async update(req, res) {
    const colab = await ContaContabil.findByPk(req.params.id);
    const { EmpresaId, cod, desc } = await colab.update(req.body);

    return res.json({
      EmpresaId,
      cod,
      desc,
    });
  }

  async delete(req, res) {
    const contContabil = await ContaContabil.findOne({
      where: { id: req.params.id },
      include: [{ model: RecDesp }],
    });
    if (contContabil.RecDesp === null) {
      contContabil.destroy();
      return res.status(200).json(`Registro ${contContabil.desc} foi deletado com Sucesso!`);
    }
    return res.status(400).json({ error: 'Registro possui dependências. Exclusão não permitida' });
  }
}
export default new ContaContabilController();
