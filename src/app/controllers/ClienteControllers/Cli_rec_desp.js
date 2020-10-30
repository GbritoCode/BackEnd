import * as yup from 'yup';
import CliRecDesp from '../../models/cli_rec_desp';
import rec_desp from '../../models/rec_desp'

class cliRecDespController {
  async store(req, res) {
    const schema = yup.object().shape({
      ClienteId: yup.string().required(),
      recDespId: yup.number().required(),
      tipoCobranca: yup.string().required(),
      valorRec: yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const { ClienteId, recDespId, tipoCobranca,valorRec } = await CliRecDesp.create(
      req.body
    );

    return res.json({
      ClienteId,
      recDespId,
      tipoCobranca,
      valorRec
    });
  }

  async get(req, res) {
    if (req.params.id && req.params.update) {
      const recDesp = await CliRecDesp.findOne({
        where: { id: req.params.update },
        include: [
          { model:rec_desp },
        ],
      });
      return res.json(recDesp);
    } else if (req.params.id) {
      const recDesp = await CliRecDesp.findAll({
        where: {
          ClienteId: req.params.id,
        },
        include: [
          { model:rec_desp },
        ],
      });
      return res.json(recDesp);
    }
  }
  async update(req, res) {
    const cliRecDesp = await CliRecDesp.findByPk(req.params.id);

    const { ClienteId, recDespId, tipoCobranca,valorRec } = await cliRecDesp.update(
      req.body
    );

    return res.json({
      ClienteId,
      recDespId,
      tipoCobranca,
      valorRec
    });
  }
}

export default new cliRecDespController();
