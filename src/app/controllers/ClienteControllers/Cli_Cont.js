import * as yup from 'yup';
import CliCont from '../../models/cli_cont';

import databaseConfig from '../../../config/database';
const Sequelize = require('sequelize');

const sequelize = new Sequelize(databaseConfig);

class cliContController {
  async store(req, res) {
    const schema = yup.object().shape({
      ClienteId: yup.string().required(),
      nome: yup.string().required(),
      cel: yup.number().required(),
      fone: yup.number().required(),
      skype: yup.string().required(),
      email: yup
        .string()
        .email()
        .required(),
      aniver: yup.date().required(),
      tipo_conta: yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const {
      ClienteId,
      nome,
      cel,
      fone,
      skype,
      email,
      aniver,
      tipo_conta,
    } = await CliCont.create(req.body);
    return res.json({
      ClienteId,
      nome,
      cel,
      fone,
      skype,
      email,
      aniver,
      tipo_conta,
    });
  }

  /*  async get(req, res) {
    sequelize
      .query('select * from cli_conts where id 1', {
        type: sequelize.QueryTypes.SELECT,
      })
      .then(function(cliCont) {
        res.json(cliCont);
      });
  }
*/
  async get(req, res) {
    const contato = await CliCont.findAll({
      where: {
        ClienteId: req.params.id,
      },
    });
    return res.json(contato);
  }

  async update(req, res) {
    const schema = yup.object().shape({
      ClienteId: yup.string(),
      nome: yup.string(),
      cel: yup.number(),
      fone: yup.number(),
      skype: yup.string(),
      email: yup.string().email(),
      aniver: yup.date(),
      tipo_conta: yup.number(),
    });

    const cliCont = await CliCont.findByPk(req.params.id);

    const {
      ClienteId,
      nome,
      cel,
      fone,
      skype,
      email,
      aniver,
      tipo_conta,
    } = await cliCont.update(req.body);

    return res.json({
      ClienteId,
      nome,
      cel,
      fone,
      skype,
      email,
      aniver,
      tipo_conta,
    });
  }
}
export default new cliContController();
