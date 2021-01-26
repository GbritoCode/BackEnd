import * as yup from 'yup';
import centroCustos from '../../models/CentroCusto';
import Empresa from '../../models/empresa';
import RecDesp from '../../models/recDesp';

class CentroCustoController {
  async store(req, res) {
    const schema = yup.object().shape({
      EmpresaId: yup.string().required(),
      cod: yup.string().required(),
      desc: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const { EmpresaId, cod, desc } = await centroCustos.create(req.body);

    return res.json({
      EmpresaId,
      cod,
      desc,
    });
  }

  async get(req, res) {
    if (!req.params.id) {
      const centCusto = await centroCustos.findAll({ include: Empresa });
      return res.json(centCusto);
    }
    const centCusto = await centroCustos.findOne({ where: { id: req.params.id } });
    return res.json(centCusto);
  }

  async update(req, res) {
    const colab = await centroCustos.findByPk(req.params.id);
    const { EmpresaId, cod, desc } = await colab.update(req.body);

    return res.json({
      EmpresaId,
      cod,
      desc,
    });
  }

  async delete(req, res) {
    const centCusto = await centroCustos.findOne({
      where: { id: req.params.id },
      include: [{ model: RecDesp }],
    });
    if (centCusto.RecDesp === null) {
      centCusto.destroy();
      return res.status(200).json(`Registro ${centCusto.desc} foi deletado com Sucesso!`);
    }
    return res.status(400).json({ error: 'Registro possui dependências. Exclusão não permitida' });
  }
}
export default new CentroCustoController();
