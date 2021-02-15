import * as yup from 'yup';
import moment from 'moment';
import { getDaysInMonth } from 'date-fns';
import { Op } from 'sequelize';
import Colab from '../../models/colab';
import Oportunidade from '../../models/oportunidade';
import Despesa from '../../models/despesas';
import Cliente from '../../models/cliente';
import FechamentoPeriodo from '../../models/fechamentoPeriodos';

class DespesasController {
  async store(req, res) {
    const schema = yup.object().shape({
      OportunidadeId: yup.number().required(),
      ColabId: yup.number().required(),
      dataDespesa: yup.date().required(),
      tipoDespesa: yup.number().required(),
      valorDespesa: yup.number().required(),
      desc: yup.string().optional(),
    });

    const checkPeriodo = await FechamentoPeriodo.findOne({
      where: {
        [Op.and]: [{
          dataFim: {
            [Op.gte]: req.body.dataDespesa,
          },
        },
        {
          dataInic: {
            [Op.lte]: req.body.dataDespesa,
          },
        },
        {
          aberto: true,
        }],
      },
    });
    if (!checkPeriodo) {
      const dataDespesaSplit = req.body.dataDespesa.split('-');
      const formatData = `${dataDespesaSplit[2]}-${dataDespesaSplit[1]}-${dataDespesaSplit[0]}`;
      return res.status(401).json({ error: `O período que contém ${formatData} já está fechado, contate o administrador` });
    }

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const {
      OportunidadeId,
      ColabId,
      dataDespesa,
      tipoDespesa,
      valorDespesa,
      desc,
    } = await Despesa.create(req.body);
    return res.json({
      OportunidadeId,
      ColabId,
      dataDespesa,
      tipoDespesa,
      valorDespesa,
      desc,
    });
  }

  async get(req, res) {
    if (req.query.total === 'true' && req.query.tipo === 'month' && req.params.id) {
      const year = moment().year();
      const month = moment().month();
      const lastDayMonth = getDaysInMonth(new Date(year, month));
      const despesa = await Despesa.sum('valorDespesa', {
        where: {
          ColabId: req.params.id,
          dataDespesa: {
            [Op.between]: [`${year}-${month + 1}-${1}`, `${year}-${month + 1}-${lastDayMonth}`],
          },
        },
      });
      return res.json(despesa);
    } if (req.query.total === 'true' && req.query.tipo === 'gerencial') {
      const year = moment().year();
      const month = moment().month();
      const lastDayMonth = getDaysInMonth(new Date(year, month));
      const despesa = await Despesa.sum('valorDespesa', {
        where: {
          dataDespesa: {
            [Op.between]: [`${year}-${month + 1}-${1}`, `${year}-${month + 1}-${lastDayMonth}`],
          },
        },
      });
      return res.json(despesa);
    } if (req.params.id && req.query.update === 'true') {
      const despesa = await Despesa.findOne({
        where: { id: req.params.id },
        include: [{ model: Oportunidade }, { model: Colab }],
      });
      return res.json(despesa);
    } if (req.query.initialDate && req.query.finalDate) {
      if (req.params.id) {
        const { initialDate, finalDate } = req.query;
        const despesa = await Despesa.findAll({
          where: {
            ColabId: req.params.id,
            dataDespesa: {
              [Op.between]: [initialDate, finalDate],
            },
          },
          include: [{ model: Oportunidade, include: [{ model: Cliente }] }, { model: Colab }],
          order: [['dataDespesa', 'DESC']],
        });

        for (let i = 0; i < despesa.length; i++) {
          const desps = despesa[i].dataValues.dataDespesa.split('-');
          despesa[i].dataValues.dataDespesa = `${desps[2]}/${desps[1]}/${desps[0]}`;
        }
        return res.json(despesa);
      } const { initialDate, finalDate } = req.query;
      const despesa = await Despesa.findAll({
        where: {
          dataDespesa: {
            [Op.between]: [initialDate, finalDate],
          },
        },
        include: [{ model: Oportunidade, include: [{ model: Cliente }] }, { model: Colab }],
        order: [['dataDespesa', 'DESC']],
      });

      for (let i = 0; i < despesa.length; i++) {
        const desps = despesa[i].dataValues.dataDespesa.split('-');
        despesa[i].dataValues.dataDespesa = `${desps[2]}/${desps[1]}/${desps[0]}`;
      }
      return res.json(despesa);
    }
    return res.json();
  }

  async update(req, res) {
    const checkPeriodo = await FechamentoPeriodo.findOne({
      where: {
        [Op.and]: [{
          dataFim: {
            [Op.gte]: req.body.dataDespesa,
          },
        },
        {
          dataInic: {
            [Op.lte]: req.body.dataDespesa,
          },
        },
        {
          aberto: true,
        }],
      },
    });
    if (!checkPeriodo) {
      const dataDespesaSplit = req.body.dataDespesa.split('-');
      const formatData = `${dataDespesaSplit[2]}-${dataDespesaSplit[1]}-${dataDespesaSplit[0]}`;
      return res.status(401).json({ error: `O período que contém ${formatData} já está fechado, contate o administrador` });
    }
    const despesa = await Despesa.findByPk(req.params.id);
    const {
      OportunidadeId,
      ColabId,
      dataDespesa,
      tipoDespesa,
      valorDespesa,
      desc,
    } = await despesa.update(req.body);

    return res.json({
      OportunidadeId,
      ColabId,
      dataDespesa,
      tipoDespesa,
      valorDespesa,
      desc,
    });
  }

  async delete(req, res) {
    const checkPeriodo = await FechamentoPeriodo.findOne({
      where: {
        [Op.and]: [{
          dataFim: {
            [Op.gte]: req.body.dataDespesa,
          },
        },
        {
          dataInic: {
            [Op.lte]: req.body.dataDespesa,
          },
        },
        {
          aberto: true,
        }],
      },
    });
    if (!checkPeriodo) {
      const dataDespesaSplit = req.body.dataDespesa.split('-');
      const formatData = `${dataDespesaSplit[2]}-${dataDespesaSplit[1]}-${dataDespesaSplit[0]}`;
      return res.status(401).json({ error: `O período que contém ${formatData} já está fechado, contate o administrador` });
    }
    const despesa = await Despesa.findOne({
      where: { id: req.params.id },
    });
    despesa.destroy();
    return res.status(200).json(`Registro de ${despesa.dataDespesa} foi deletado com Sucesso!`);
  }
}
export default new DespesasController();
