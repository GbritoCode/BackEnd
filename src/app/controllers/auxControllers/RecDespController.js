import * as yup from 'yup';
import RecDesp from '../../models/recDesp';
import Empresa from '../../models/empresa';
import itmControle from '../../models/itmControle';

class RecDespController {
  async store(req, res) {
    const schema = yup.object().shape({
      EmpresaId: yup.string().required(),
      itmControleId: yup.string().required(),
      desc: yup.string().required(),
      recDesp: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const {
      EmpresaId, itmControleId, desc, recDesp,
    } = await RecDesp.create(req.body);
    return res.json({
      EmpresaId,
      itmControleId,
      desc,
      recDesp,
    });
  }

  async get(req, res) {
    if (req.query.rec) {
      const recDesp = await RecDesp.findAll({
        where: { recDesp: 'Rec' },
        include: [{ model: Empresa }, { model: itmControle }],
      });
      return res.json(recDesp);
    }

    if (!req.params.id) {
      const recDesp = await RecDesp.findAll({
        include: [{ model: Empresa }, { model: itmControle }],
      });
      return res.json(recDesp);
    }
    const recDesp = await RecDesp.findOne({ where: { id: req.params.id } });
    return res.json(recDesp);
  }

  async update(req, res) {
    const recdesp = await RecDesp.findByPk(req.params.id);
    const {
      EmpresaId, itmControleId, desc, recDesp,
    } = await recdesp.update(req.body);

    return res.json({
      EmpresaId,
      itmControleId,
      desc,
      recDesp,
    });
  }
}
export default new RecDespController();
