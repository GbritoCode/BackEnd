import * as yup from 'yup';
import CliComp from '../../models/cliente_comp';
import databaseConfig from '../../../config/database';
const Sequelize = require('sequelize');

const sequelize = new Sequelize(databaseConfig);
class cliCompController {
  async store(req, res) {
    const schema = yup.object().shape({
      ClienteId: yup.string().required(),
      rz_social: yup.string().required(),
      cond_pgmto: yup.number().required(),
      nome_abv: yup.string().required(),
      cep: yup.string().required(),
      rua: yup.string().required(),
      numero: yup.number().required(),
      bairro: yup.string().required(),
      cidade: yup.string().required(),
      uf: yup.string().required(),
      insc_mun: yup.number().required(),
      insc_uf: yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const {
      ClienteId,
      rz_social,
      cond_pgmto,
      nome_abv,
      cep,
      rua,
      numero,
      bairro,
      cidade,
      uf,
      insc_mun,
      insc_uf,
    } = await CliComp.create(req.body);
    return res.json({
      ClienteId,
      rz_social,
      cond_pgmto,
      nome_abv,
      cep,
      rua,
      numero,
      bairro,
      cidade,
      uf,
      insc_mun,
      insc_uf,
    });
  }

  async get(req, res) {
    const complemento = await CliComp.findAll({
      where: { ClienteId: req.params.id },
    });
    return res.json(complemento);
  }
}
export default new cliCompController();
