import * as yup from 'yup';
import ColabComp from '../../models/colab_comp';
import databaseConfig from '../../../config/database';
const Sequelize = require('sequelize');

const sequelize = new Sequelize(databaseConfig);

class colabCompController {
  async store(req, res) {
    const schema = yup.object().shape({
      ColabId: yup.number().required(),
      nivel: yup.number().required(),
      tipo_valor: yup.number().required(),
      valor: yup.number().required(),
      data_inic: yup.date().required(),
      data_fim: yup.date().required(),
      tipo_atend: yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const {
      ColabId,
      nivel,
      tipo_valor,
      valor,
      data_inic,
      data_fim,
      tipo_atend,
    } = await ColabComp.create(req.body);
    return res.json({
      ColabId,
      nivel,
      tipo_valor,
      valor,
      data_inic,
      data_fim,
      tipo_atend,
    });
  }

  async get(req, res) {
    const colabComp = await ColabComp.findAll({
      where: {
        ColabId: req.params.id,
      },
    });
    return res.json(colabComp);
  }
  async update(req, res) {
    const colab = await ColabComp.findByPk(req.params.id);
    const {
      ColabId,
      nivel,
      tipo_valor,
      valor,
      data_inic,
      data_fim,
      tipo_atend,
    } = await colab.update(req.body);

    return res.json({
      ColabId,
      nivel,
      tipo_valor,
      valor,
      data_inic,
      data_fim,
      tipo_atend,
    });
  }
}
export default new colabCompController();
