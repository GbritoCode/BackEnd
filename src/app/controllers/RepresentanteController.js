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
    if (!req.params.id) {
      const representante = await Representante.findAll({});
      return res.json(representante);
    } else {
      const representante = await Representante.findOne({
        where: { id: req.params.id },
      });
      return res.json(representante);
    }
  }
  async update(req, res) {
    const representante = await Representante.findByPk(req.params.id);
    const {
      EmpresaId,
      nome,
      percnt_comiss,
      vlr_fix_mens,
    } = await representante.update(req.body);

    return res.json({
      EmpresaId,
      nome,
      percnt_comiss,
      vlr_fix_mens,
    });
  }
}
export default new representanteController();
