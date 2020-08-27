import * as yup from 'yup';
import Segmento from '../models/segmento.js';
import databaseConfig from './../../config/database';
const Sequelize = require('sequelize');

const sequelize = new Sequelize(databaseConfig);

class segmentoController {
  async store(req, res) {
    const schema = yup.object().shape({
      EmpresaId: yup.string().required(),
      Und_negId: yup.number().required(),
      ProdutoId: yup.number().required(),
      AreaId: yup.number().required(),
      desc_segmt: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const {
      EmpresaId,
      Und_negId,
      ProdutoId,
      AreaId,
      desc_segmt,
    } = await Segmento.create(req.body);

    return res.json({
      EmpresaId,
      Und_negId,
      ProdutoId,
      AreaId,
      desc_segmt,
    });
  }
  async get(req, res) {
    sequelize
      .query('select * from segmentos', {
        type: sequelize.QueryTypes.SELECT,
      })
      .then(function(segmento) {
        res.json(segmento);
      });
  }
}
export default new segmentoController();
