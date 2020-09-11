import * as yup from 'yup';
import ItmControle from '../models/itm_controle';

import databaseConfig from './../../config/database';
const Sequelize = require('sequelize');

const sequelize = new Sequelize(databaseConfig);

class ItmControleController {
  async store(req, res) {
    const schema = yup.object().shape({
      EmpresaId: yup.string().required(),
      desc_item: yup.string().required(),
      tipo_item: yup.number().required(),
      conta_contabil: yup.number().required(),
      cent_custo: yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const {
      EmpresaId,
      desc_item,
      tipo_item,
      conta_contabil,
      cent_custo,
    } = await ItmControle.create(req.body);
    return res.json({
      EmpresaId,
      desc_item,
      tipo_item,
      conta_contabil,
      cent_custo,
    });
  }
  async get(req, res) {
    if (!req.params.id) {
      const itmCtrl = await ItmControle.findAll({});
      return res.json(itmCtrl);
    } else {
      const itmCtrl = await ItmControle.findOne({
        where: { id: req.params.id },
      });
      return res.json(itmCtrl);
    }
  }
  async update(req, res) {
    const itmCtrl = await ItmControle.findByPk(req.params.id);
    const {
      EmpresaId,
      desc_item,
      tipo_item,
      conta_contabil,
      cent_custo,
    } = await itmCtrl.update(req.body);

    return res.json({
      EmpresaId,
      desc_item,
      tipo_item,
      conta_contabil,
      cent_custo,
    });
  }
}
export default new ItmControleController();
