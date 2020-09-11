import * as yup from 'yup';
import Colab from '../../models/colab';

import databaseConfig from '../../../config/database';
import Colab_comp from '../../models/colab_comp';
const Sequelize = require('sequelize');

const sequelize = new Sequelize(databaseConfig);

class colabController {
  async store(req, res) {
    const schema = yup.object().shape({
      CPF: yup.number().required(),
      FornecId: yup.number().required(),
      log_usr: yup.number().required(),
      EmpresaId: yup.string().required(),
      nome: yup.string().required(),
      dt_admiss: yup.date().required(),
      cel: yup.number().required(),
      skype: yup.string().required(),
      email: yup
        .string()
        .email()
        .required(),
      espec: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const {
      CPF,
      FornecId,
      log_usr,
      EmpresaId,
      nome,
      dt_admiss,
      cel,
      skype,
      email,
      espec,
    } = await Colab.create(req.body);
    return res.json({
      CPF,
      FornecId,
      log_usr,
      EmpresaId,
      nome,
      dt_admiss,
      cel,
      skype,
      email,
      espec,
    });
  }
  async get(req, res) {
    if (!req.params.id) {
      const colab = await Colab.findAll({});
      return res.json(colab);
    } else {
      const colab = await Colab.findOne({ where: { id: req.params.id } });
      return res.json(colab);
    }
  }
  async update(req, res) {
    const colab = await Colab.findByPk(req.params.id);
    const {
      CPF,
      FornecId,
      log_usr,
      EmpresaId,
      nome,
      dt_admiss,
      cel,
      skype,
      email,
      espec,
    } = await colab.update(req.body);

    return res.json({
      CPF,
      FornecId,
      log_usr,
      EmpresaId,
      nome,
      dt_admiss,
      cel,
      skype,
      email,
      espec,
    });
  }
}
export default new colabController();
