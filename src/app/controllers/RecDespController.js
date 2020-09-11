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
    if (!req.params.id) {
      const recDesp = await RecDesp.findAll({});
      return res.json(recDesp);
    } else {
      const recDesp = await RecDesp.findOne({ where: { id: req.params.id } });
      return res.json(recDesp);
    }
  }
  async update(req, res) {
    const recDesp = await RecDesp.findByPk(req.params.id);
    const { EmpresaId, nome, license } = await recDesp.update(req.body);

    return res.json({
      EmpresaId,
      nome,
      license,
    });
  }
}
export default new RecDespController();
