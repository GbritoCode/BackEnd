import * as yup from 'yup';
import RecDesp from '../../models/recDesp';
import Empresa from '../../models/empresa';

class RecDespController {
  async store(req, res) {
    const schema = yup.object().shape({
      EmpresaId: yup.string().required(),
      desc: yup.string().required(),
      recDesp: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const {
      EmpresaId, desc, recDesp,
    } = await RecDesp.create(req.body);
    return res.json({
      EmpresaId,
      desc,
      recDesp,
    });
  }

  async get(req, res) {
    if (req.query.rec) {
      const recDesp = await RecDesp.findAll({
        where: { recDesp: 'Rec' },
        include: [{ model: Empresa }],
      });
      return res.json(recDesp);
    }

    if (!req.params.id) {
      const recDesp = await RecDesp.findAll({
        include: [{ model: Empresa }],
      });
      return res.json(recDesp);
    }
    const recDesp = await RecDesp.findOne({ where: { id: req.params.id } });
    return res.json(recDesp);
  }

  async update(req, res) {
    const recdesp = await RecDesp.findByPk(req.params.id);
    const {
      EmpresaId, desc, recDesp,
    } = await recdesp.update(req.body);

    return res.json({
      EmpresaId,
      desc,
      recDesp,
    });
  }
}
export default new RecDespController();
