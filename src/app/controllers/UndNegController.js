import * as yup from 'yup';
import UndNeg from '../models/undNeg';
import Empresa from '../models/empresa';
import Segmento from '../models/segmento';

class UndNegController {
  async store(req, res) {
    const schema = yup.object().shape({
      EmpresaId: yup.string().required(),
      descUndNeg: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const { EmpresaId, descUndNeg } = await UndNeg.create(req.body);

    return res.json({
      EmpresaId,
      descUndNeg,
    });
  }

  async get(req, res) {
    if (!req.params.id) {
      const undNeg = await UndNeg.findAll({ include: Empresa });
      return res.json(undNeg);
    }
    const undNeg = await UndNeg.findOne({ where: { id: req.params.id } });
    return res.json(undNeg);
  }

  async update(req, res) {
    const undneg = await UndNeg.findByPk(req.params.id);
    const { EmpresaId, descUndNeg } = await undneg.update(req.body);

    return res.json({
      EmpresaId,
      descUndNeg,
    });
  }

  async delete(req, res) {
    const undneg = await UndNeg.findOne({
      where: { id: req.params.id },
      include: [{ model: Segmento }],
    });
    if (undneg.Segmento === null) {
      undneg.destroy();
      return res.status(200).json(`Registro ${undneg.descArea} foi deletado com Sucesso!`);
    }
    return res.status(400).json({ error: 'Você não pode Excluir esse registro pois ele tem dependências' });
  }
}
export default new UndNegController();
