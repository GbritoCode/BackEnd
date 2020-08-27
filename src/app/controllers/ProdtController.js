import * as yup from 'yup';
import Prodt from '../models/produto.js';
import databaseConfig from './../../config/database';
const Sequelize = require('sequelize');

const sequelize = new Sequelize(databaseConfig);

class prodtController {
  async store(req, res) {
    const schema = yup.object().shape({
      EmpresaId: yup.string().required(),
      desc_prodt: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const { EmpresaId, desc_prodt } = await Prodt.create(req.body);

    return res.json({
      EmpresaId,
      desc_prodt,
    });
  }
  async get(req, res) {
    sequelize
      .query('select * from produtos', {
        type: sequelize.QueryTypes.SELECT,
      })
      .then(function(Prodt) {
        res.json(Prodt);
      });
  }
}
export default new prodtController();
