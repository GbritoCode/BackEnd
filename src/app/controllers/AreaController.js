import * as yup from 'yup';
import Area from '../models/area.js';

import databaseConfig from './../../config/database';
const Sequelize = require('sequelize');

const sequelize = new Sequelize(databaseConfig);

class areaController {
  async store(req, res) {
    const schema = yup.object().shape({
      EmpresaId: yup.string().required(),
      desc_area: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const { EmpresaId, desc_area } = await Area.create(req.body);

    return res.json({
      EmpresaId,
      desc_area,
    });
  }
  async get(req, res) {
    if (!req.params.id) {
      const area = await Area.findAll({});
      return res.json(area);
    } else {
      const area = await Area.findOne({ where: { id: req.params.id } });
      return res.json(area);
    }
  }
  async update(req, res) {
    const colab = await Area.findByPk(req.params.id);
    const { EmpresaId, desc_area } = await colab.update(req.body);

    return res.json({
      EmpresaId,
      desc_area,
    });
  }
}
export default new areaController();
