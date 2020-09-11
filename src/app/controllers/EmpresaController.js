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
    if (!req.params.id) {
      const empresa = await Empresa.findAll({});
      return res.json(empresa);
    } else {
      const empresa = await Empresa.findOne({ where: { id: req.params.id } });
      return res.json(empresa);
    }
  }
  async update(req, res) {
    const empresa = await Empresa.findByPk(req.params.id);
    const { UserId, id_federal, nome, license } = await empresa.update(
      req.body
    );

    return res.json({
      UserId,
      id_federal,
      nome,
      license,
    });
  }
}
export default new empresaController();
