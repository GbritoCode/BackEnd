import * as yup from 'yup';
import Empresa from '../models/empresa';
import databaseConfig from './../../config/database';
const Sequelize = require('sequelize');

const sequelize = new Sequelize(databaseConfig);

class empresaController {
  async store(req, res) {
    const schema = yup.object().shape({
      UserId: yup.number().required(),
      id_federal: yup.string().required(),
      nome: yup.string().required(),
      license: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const { id, UserId, id_federal, nome, license } = await Empresa.create(
      req.body
    );
    return res.json({
      id,
      UserId,
      id_federal,
      nome,
      license,
    });
  }
  async get(req, res) {
    sequelize
      .query('select * from empresas', {
        type: sequelize.QueryTypes.SELECT,
      })
      .then(function(empresa) {
        res.json(empresa);
      });
  }
}
export default new empresaController();
