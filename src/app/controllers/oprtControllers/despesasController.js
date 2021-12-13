import * as yup from 'yup';
import moment from 'moment';
import { getDaysInMonth } from 'date-fns';
import { Op } from 'sequelize';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import Colab from '../../models/colab';
import Oportunidade from '../../models/oportunidade';
import Despesa from '../../models/despesas';
import Cliente from '../../models/cliente';
import FechamentoPeriodo from '../../models/fechamentoPeriodos';

class DespesasController {
  async store(req, res) {
    const { body } = req;
    const checkPeriodo = await FechamentoPeriodo.findOne({
      where: {
        [Op.and]: [{
          dataFim: {
            [Op.gte]: body.dataDespesa,
          },
        },
        {
          dataInic: {
            [Op.lte]: body.dataDespesa,
          },
        }],
      },
    });
    const aberto = checkPeriodo.getDataValue('situacao');
    if (aberto !== 'Aberto') {
      const colab = await Colab.findByPk(body.ColabId);
      if (!colab) {
        return res.status(500).json({ error: 'Erro interno de servidor' });
      }
      try {
        const token = colab.getDataValue('PeriodToken');
        const decoded = await promisify(jwt.verify)(token, process.env.TOKENS_SECRET);
        if (decoded.periodo === checkPeriodo.getDataValue('nome') && decoded.perms.desp) {
          return res.json(await Despesa.create(body));
        }
        throw 'error';
      } catch (err) {
        const dataDespesaSplit = body.dataDespesa.split('-');
        const formatData = `${dataDespesaSplit[2]}-${dataDespesaSplit[1]}-${dataDespesaSplit[0]}`;
        return res.status(401).json({
          error: `O período que contém ${formatData} já está fechado, contate o administrador`,
        });
      }
    }

    return res.json(await Despesa.create(body));
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
    const despesa = await Despesa.findByPk(req.params.id);
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
        }],
      },
    });
    const aberto = checkPeriodo.getDataValue('situacao');
    if (aberto !== 'Aberto') {
      const colab = await Colab.findByPk(req.body.ColabId);
      if (!colab) {
        return res.status(500).json({ error: 'Erro interno de servidor' });
      }
      try {
        const token = colab.getDataValue('PeriodToken');
        const decoded = await promisify(jwt.verify)(token, process.env.TOKENS_SECRET);
        if (decoded.periodo === checkPeriodo.getDataValue('nome') && decoded.perms.desp) {
          return res.json(await despesa.update(req.body));
        }
        throw 'error';
      } catch (err) {
        const dataDespesaSplit = req.body.dataDespesa.split('-');
        const formatData = `${dataDespesaSplit[2]}-${dataDespesaSplit[1]}-${dataDespesaSplit[0]}`;
        return res.status(401).json({
          error: `O período que contém ${formatData} já está fechado, contate o administrador`,
        });
      }
    }

    return res.json(await despesa.update(req.body));
  }

  async delete(req, res) {
    const despesa = await Despesa.findOne({
      where: { id: req.params.id },
    });

    const checkPeriodo = await FechamentoPeriodo.findOne({
      where: {
        [Op.and]: [{
          dataFim: {
            [Op.gte]: despesa.dataDespesa,
          },
        },
        {
          dataInic: {
            [Op.lte]: despesa.dataDespesa,
          },
        }],
      },
    });
    const aberto = checkPeriodo.getDataValue('situacao');
    if (aberto !== 'Aberto') {
      const colab = await Colab.findByPk(despesa.ColabId);
      if (!colab) {
        return res.status(500).json({ error: 'Erro interno de servidor' });
      }
      try {
        const token = colab.getDataValue('PeriodToken');
        const decoded = await promisify(jwt.verify)(token, process.env.TOKENS_SECRET);
        if (decoded.periodo === checkPeriodo.getDataValue('nome')) {
          despesa.destroy();
          return res.status(200).json(`Registro de ${despesa.dataDespesa} foi deletado com Sucesso!`);
        }
        throw 'error';
      } catch (err) {
        const dataDespesaSplit = despesa.dataDespesa.split('-');
        const formatData = `${dataDespesaSplit[2]}-${dataDespesaSplit[1]}-${dataDespesaSplit[0]}`;
        return res.status(401).json({
          error: `O período que contém ${formatData} já está fechado, contate o administrador`,
        });
      }
    }

    despesa.destroy();
    return res.status(200).json(`Registro de ${despesa.dataDespesa} foi deletado com Sucesso!`);
  }
}
export default new DespesasController();
