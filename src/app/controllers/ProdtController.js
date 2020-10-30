import * as yup from 'yup';
import Prodt from '../models/produto.js';
import Empresa from '../models/empresa';

class prodtController {
  async store(req, res) {
    const schema = yup.object().shape({
      EmpresaId: yup.string().required(),
      descProdt: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const { EmpresaId, descProdt } = await Prodt.create(req.body);

    return res.json({
      EmpresaId,
      descProdt,
    });
  }
  async get(req, res) {
    if (!req.params.id) {
      const prodt = await Prodt.findAll({ include: Empresa });
      return res.json(prodt);
    } else {
      const prodt = await Prodt.findOne({ where: { id: req.params.id } });
      return res.json(prodt);
    }
  }

  async update(req, res) {
    const prodt = await Prodt.findByPk(req.params.id);
    const { EmpresaId, descProdt } = await prodt.update(req.body);

    return res.json({
      EmpresaId,
      descProdt,
    });
  }
}
export default new prodtController();
