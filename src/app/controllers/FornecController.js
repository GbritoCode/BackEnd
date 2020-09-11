import * as yup from 'yup';
import Fornec from '../models/fornec';

import databaseConfig from './../../config/database';
const Sequelize = require('sequelize');

const sequelize = new Sequelize(databaseConfig);

class FornecController {
  async store(req, res) {
    const schema = yup.object().shape({
      CNPJ: yup.string().required(),
      EmpresaId: yup.string().required(),
      nome: yup.string().required(),
      cond_pgmto: yup.number().required(),
      nome_conta: yup.string().required(),
      fone: yup.number().required(),
      cep: yup.string().required(),
      rua: yup.string().required(),
      numero: yup.number().required(),
      complemento: yup.string().required(),
      bairro: yup.string().required(),
      cidade: yup.string().required(),
      uf: yup.string().required(),
      banco: yup.string().required(),
      agencia: yup.string().required(),
      conta: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const {
      CNPJ,
      EmpresaId,
      nome,
      cond_pgmto,
      nome_conta,
      fone,
      cep,
      rua,
      numero,
      complemento,
      bairro,
      cidade,
      uf,
      banco,
      agencia,
      conta,
    } = await Fornec.create(req.body);
    return res.json({
      CNPJ,
      EmpresaId,
      nome,
      cond_pgmto,
      nome_conta,
      fone,
      cep,
      rua,
      numero,
      complemento,
      bairro,
      cidade,
      uf,
      banco,
      agencia,
      conta,
    });
  }
  async get(req, res) {
    if (!req.params.id) {
      const fornec = await Fornec.findAll({});
      return res.json(fornec);
    } else {
      const fornec = await Fornec.findOne({ where: { id: req.params.id } });
      return res.json(fornec);
    }
  }
  async update(req, res) {
    const fornec = await Fornec.findByPk(req.params.id);
    const {
      CNPJ,
      EmpresaId,
      nome,
      cond_pgmto,
      nome_conta,
      fone,
      cep,
      rua,
      numero,
      complemento,
      bairro,
      cidade,
      uf,
      banco,
      agencia,
      conta,
    } = await fornec.update(req.body);

    return res.json({
      CNPJ,
      EmpresaId,
      nome,
      cond_pgmto,
      nome_conta,
      fone,
      cep,
      rua,
      numero,
      complemento,
      bairro,
      cidade,
      uf,
      banco,
      agencia,
      conta,
    });
  }
}
export default new FornecController();
