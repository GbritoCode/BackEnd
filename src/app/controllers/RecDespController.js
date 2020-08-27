import * as yup from 'yup';
import RecDesp from '../models/rec_desp.js';
import databaseConfig from './../../config/database';
const Sequelize = require('sequelize');

const sequelize = new Sequelize(databaseConfig);

class RecDespController {
  async store(req, res) {
    const schema = yup.object().shape({
      EmpresaId: yup.string().required(),
      nome: yup.string().required(),
      license: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const { EmpresaId, nome, license } = await RecDesp.create(req.body);

    return res.json({
      EmpresaId,
      nome,
      license,
    });
  }
  async get(req, res) {
    sequelize
      .query('select * from rec_desps', {
        type: sequelize.QueryTypes.SELECT,
      })
      .then(function(recDesp) {
        res.json(recDesp);
      });
  }
}
export default new RecDespController();
