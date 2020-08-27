import * as yup from 'yup';
import Parametros from '../models/parametros';

import databaseConfig from './../../config/database';
const Sequelize = require('sequelize');

const sequelize = new Sequelize(databaseConfig);

class parametrosController {
  async store(req, res) {
    const schema = yup.object().shape({
      EmpresaId: yup.string().required(),
      impostos: yup.number().required(),
      vlr_min_hr: yup.number().required(),
      vlr_bs_hr: yup.number().required(),
      vlr_bs_desp: yup.number().required(),
      adianta_pgmto: yup.string().required(),
      perc_adianta_pgmto: yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const {
      EmpresaId,
      impostos,
      vlr_min_hr,
      vlr_bs_hr,
      vlr_bs_desp,
      adianta_pgmto,
      perc_adianta_pgmto,
    } = await Parametros.create(req.body);
    return res.json({
      EmpresaId,
      impostos,
      vlr_min_hr,
      vlr_bs_hr,
      vlr_bs_desp,
      adianta_pgmto,
      perc_adianta_pgmto,
    });
  }
  async get(req, res) {
    sequelize
      .query('select * from parametros', {
        type: sequelize.QueryTypes.SELECT,
      })
      .then(function(parametros) {
        res.json(parametros);
      });
  }
}
export default new parametrosController();