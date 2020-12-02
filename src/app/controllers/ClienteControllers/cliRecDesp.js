import * as yup from 'yup';
import CliRecDesp from '../../models/cliRecDesp';
import RecDesp from '../../models/recDesp';

const { Op } = require('sequelize');

class CliRecDespController {
  async store(req, res) {
    const schema = yup.object().shape({
      ClienteId: yup.string().required(),
      recDespId: yup.number().required(),
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
        recDespId: req.body.recDespId,
        dataFim: {
          [Op.gte]: req.body.dataInic,
        },
      },
    });
    if (valueExists) {
      return res.status(400).json({ error: 'Value already exists in period' });
    }

    const {
      ClienteId, recDespId, tipoCobranca, valorRec, dataInic, dataFim,
    } = await CliRecDesp.create(
      req.body,
    );

    return res.json({
      ClienteId,
      recDespId,
      tipoCobranca,
      valorRec,
      dataInic,
      dataFim,
    });
  }

  async get(req, res) {
    if (req.query.itmControleId && req.query.cobranca) {
      const { itmControleId, cobranca } = req.query;
      const [date, month, year] = new Date().toLocaleDateString('pt-BR').split('/');
      const recDesp = await CliRecDesp.findOne({
        where: {
          ClienteId: req.params.id,
          tipoCobranca: cobranca,
          dataInic: { [Op.lte]: `${year} - ${month} - ${date}` },
          dataFim: { [Op.gte]: `${year}- ${month} - ${date}` },
        },
        include: [
          { model: RecDesp, where: { itmControleId } },
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
  }

  async update(req, res) {
    const cliRecDesp = await CliRecDesp.findByPk(req.params.id);

    const {
      ClienteId, recDespId, tipoCobranca, valorRec, dataInic, dataFim,
    } = await cliRecDesp.update(
      req.body,
    );

    return res.json({
      ClienteId,
      recDespId,
      tipoCobranca,
      valorRec,
      dataInic,
      dataFim,
    });
  }
}

export default new CliRecDespController();
