import * as yup from 'yup';
import UndNeg from '../models/und_neg.js';
import databaseConfig from './../../config/database';
const Sequelize = require('sequelize');

const sequelize = new Sequelize(databaseConfig);

class UndNegController {
  async store(req, res) {
    const schema = yup.object().shape({
      EmpresaId: yup.string().required(),
      desc_und_neg: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const { EmpresaId, desc_und_neg } = await UndNeg.create(req.body);

    return res.json({
      EmpresaId,
      desc_und_neg,
    });
  }
  async get(req, res) {
    if (!req.params.id) {
      const undNeg = await UndNeg.findAll({});
      return res.json(undNeg);
    } else {
      const undNeg = await UndNeg.findOne({ where: { id: req.params.id } });
      return res.json(undNeg);
    }
  }
  async update(req, res) {
    const undneg = await UndNeg.findByPk(req.params.id);
    const { EmpresaId, desc_und_neg } = await undneg.update(req.body);

    return res.json({
      EmpresaId,
      desc_und_neg,
    });
  }
}
export default new UndNegController();
