import * as yup from 'yup';
import Representante from '../models/representante';
import databaseConfig from './../../config/database';
const Sequelize = require('sequelize');

const sequelize = new Sequelize(databaseConfig);

class representanteController {
  async store(req, res) {
    const schema = yup.object().shape({
      EmpresaId: yup.string().required(),
      nome: yup.string().required(),
      percnt_comiss: yup.number().required(),
      vlr_fix_mens: yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const {
      EmpresaId,
      nome,
      percnt_comiss,
      vlr_fix_mens,
    } = await Representante.create(req.body);
    return res.json({
      EmpresaId,
      nome,
      percnt_comiss,
      vlr_fix_mens,
    });
  }
  async get(req, res) {
    sequelize
      .query('select * from representantes', {
        type: sequelize.QueryTypes.SELECT,
      })
      .then(function(representante) {
        res.json(representante);
      });
  }
}
export default new representanteController();
