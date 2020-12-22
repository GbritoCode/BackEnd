import * as yup from 'yup';
import moment from 'moment';
import CliRecDesp from '../../models/cliRecDesp';
import RecDesp from '../../models/recDesp';

const { Op } = require('sequelize');

class CliRecDespController {
  async store(req, res) {
    const schema = yup.object().shape({
      ClienteId: yup.string().required(),
      RecDespId: yup.number().required(),
      tipoCobranca: yup.string().required(),
      valorRec: yup.number().required(),
      dataFim: yup.date().required(),
      dataInic: yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const valueExists = await CliRecDesp.findOne({
      where: {
        ClienteId: req.body.ClienteId,
        tipoCobranca: req.body.tipoCobranca,
        RecDespId: req.body.RecDespId,
        dataFim: {
          [Op.gte]: req.body.dataInic,
        },
      },
    });
    if (valueExists) {
      return res.status(400).json({ error: 'Value already exists in period' });
    }

    const {
      ClienteId, RecDespId, tipoCobranca, valorRec, dataInic, dataFim,
    } = await CliRecDesp.create(
      req.body,
    );

    return res.json({
      ClienteId,
      RecDespId,
      tipoCobranca,
      valorRec,
      dataInic,
      dataFim,
    });
  }

  async get(req, res) {
    if (req.query.ItmControleId && req.query.cobranca) {
      const { ItmControleId, cobranca } = req.query;
      const year = moment().year();
      const month = moment().month() + 1;
      const date = moment().date();
      const recDesp = await CliRecDesp.findOne({
        where: {
          ClienteId: req.params.id,
          tipoCobranca: cobranca,
          dataInic: { [Op.lte]: `${year}-${month}-${date}` },
          dataFim: { [Op.gte]: `${year}-${month}-${date}` },
        },
        include: [
          { model: RecDesp, where: { ItmControleId } },
        ],
      });
      return res.json(recDesp);
    }
    if (req.params.id && req.params.update) {
      const recDesp = await CliRecDesp.findOne({
        where: { id: req.params.update },
        include: [
          { model: RecDesp },
        ],
      });
      return res.json(recDesp);
    } if (req.params.id) {
      const recDesp = await CliRecDesp.findAll({
        where: {
          ClienteId: req.params.id,
        },
        include: [
          { model: RecDesp },
        ],
      });
      return res.json(recDesp);
    }
    return res.json();
  }

  async update(req, res) {
    const cliRecDesp = await CliRecDesp.findByPk(req.params.id);

    const {
      ClienteId, RecDespId, tipoCobranca, valorRec, dataInic, dataFim,
    } = await cliRecDesp.update(
      req.body,
    );

    return res.json({
      ClienteId,
      RecDespId,
      tipoCobranca,
      valorRec,
      dataInic,
      dataFim,
    });
  }
}

export default new CliRecDespController();
