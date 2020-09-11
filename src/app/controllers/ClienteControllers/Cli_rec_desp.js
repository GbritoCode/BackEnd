import * as yup from 'yup';
import CliRecDesp from '../../models/cli_rec_desp';
import databaseConfig from '../../../config/database';
const Sequelize = require('sequelize');

const sequelize = new Sequelize(databaseConfig);

class cliRecDespController {
  async store(req, res) {
    const schema = yup.object().shape({
      ClienteId: yup.string().required(),
      tipo_rec_desp: yup.number().required(),
      nome_rec_desp: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const { ClienteId, tipo_rec_desp, nome_rec_desp } = await CliRecDesp.create(
      req.body
    );

    return res.json({
      ClienteId,
      tipo_rec_desp,
      nome_rec_desp,
    });
  }

  async get(req, res) {
    const rec_desp = await CliRecDesp.findAll({
      where: { ClienteId: req.params.id },
    });
    return res.json(rec_desp);
  }
}

export default new cliRecDespController();
