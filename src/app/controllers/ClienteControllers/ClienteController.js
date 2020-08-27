import * as yup from 'yup';
import Cliente from '../../models/cliente';
import databaseConfig from '../../../config/database';
const Sequelize = require('sequelize');

const sequelize = new Sequelize(databaseConfig);

class clienteController {
  async store(req, res) {
    const schema = yup.object().shape({
      CNPJ: yup.string().required(),
      nome_abv: yup.string().required(),
      representante: yup.string().required(),
      tipo_comiss: yup.number(),
      EmpresaId: yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const {
      id,
      CNPJ,
      nome_abv,
      representante,
      tipo_comiss,
      EmpresaId,
    } = await Cliente.create(req.body);
    return res.json({
      id,
      CNPJ,
      nome_abv,
      representante,
      tipo_comiss,
      EmpresaId,
    });
  }

  async get(req, res) {
    const cliente = await Cliente.findAll({});
    return res.json(cliente);
  }

  async update(req, res) {
    const schema = yup.object().shape({
      CNPJ: yup.string(),
      nome_abv: yup.string(),
      representante: yup.string(),
      tipo_comiss: yup.number(),
      EmpresaId: yup.number(),
    });
    const cliente = await Cliente.findByPk(req.params.id);

    const {
      nome_abv,
      representante,
      tipo_comiss,
      prospect,
    } = await cliente.update(req.body);

    return res.json({
      nome_abv,
      representante,
      tipo_comiss,
      prospect,
    });
  }
}
export default new clienteController();
