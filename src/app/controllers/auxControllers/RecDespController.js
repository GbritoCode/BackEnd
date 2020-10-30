import * as yup from 'yup';
import RecDesp from '../../models/rec_desp.js';
import Empresa from '../../models/empresa.js';

class RecDespController {
  async store(req, res) {
    const schema = yup.object().shape({
      EmpresaId: yup.string().required(),
      desc: yup.string().required(),
      rec_desp: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const { EmpresaId, desc,rec_desp } = await RecDesp.create(req.body);

    return res.json({
      EmpresaId,
      desc,
      rec_desp,
    });
  }
  async get(req, res) {
    if (!req.params.id) {
      const recDesp = await RecDesp.findAll({ include: Empresa });
      return res.json(recDesp);
    } else {
      const recDesp = await RecDesp.findOne({ where: { id: req.params.id } });
      return res.json(recDesp);
    }
  }
  async update(req, res) {
    const recDesp = await RecDesp.findByPk(req.params.id);
    const { EmpresaId, desc,rec_desp } = await recDesp.update(req.body);

    return res.json({
      EmpresaId,
      desc,
      rec_desp
    });
  }
}
export default new RecDespController();
