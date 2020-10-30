import * as yup from 'yup';
import Area from '../models/area.js';
import Empresa from '../models/empresa';

class areaController {
  async store(req, res) {
    const schema = yup.object().shape({
      EmpresaId: yup.string().required(),
      descArea: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const { EmpresaId, descArea } = await Area.create(req.body);

    return res.json({
      EmpresaId,
      descArea,
    });
  }
  async get(req, res) {
    if (!req.params.id) {
      const area = await Area.findAll({ include: Empresa });
      return res.json(area);
    } else {
      const area = await Area.findOne({ where: { id: req.params.id } });
      return res.json(area);
    }
  }
  async update(req, res) {
    const colab = await Area.findByPk(req.params.id);
    const { EmpresaId, descArea } = await colab.update(req.body);

    return res.json({
      EmpresaId,
      descArea,
    });
  }
}
export default new areaController();
