import { Op } from 'sequelize';
import { getDaysInMonth } from 'date-fns';
import moment from 'moment';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import Colab from '../../models/colab';
import Cliente from '../../models/cliente';
import Oportunidade from '../../models/oportunidade';
import Hora from '../../models/horas';
import Area from '../../models/area';
import FechamentoPeriodo from '../../models/fechamentoPeriodos';

class HoraController {
  async store(req, res) {
    const checkPeriodo = await FechamentoPeriodo.findOne({
      where: {
        [Op.and]: [{
          dataFim: {
            [Op.gte]: req.body.dataAtivd,
          },
        },
        {
          dataInic: {
            [Op.lte]: req.body.dataAtivd,
          },
        }],
      },
    });
    if (!checkPeriodo) {
      return res.status(400).json({
        error: 'Não existe nenhum período criado, por favor crie um',
      });
    }
    const aberto = checkPeriodo.getDataValue('situacao');
    if (aberto !== 'Aberto') {
      const colab = await Colab.findByPk(req.body.ColabId);
      if (!colab) {
        return res.status(500).json({ error: 'Erro interno de servidor' });
      }
      try {
        const token = colab.getDataValue('PeriodToken');
        const decoded = await promisify(jwt.verify)(token, process.env.TOKENS_SECRET);
        if (decoded.periodo === checkPeriodo.getDataValue('nome')) {
          return res.json(await Hora.create(req.body));
        }
        throw 'error';
      } catch (err) {
        const dataAtivdSplit = req.body.dataAtivd.split('-');
        const formatData = `${dataAtivdSplit[2]}-${dataAtivdSplit[1]}-${dataAtivdSplit[0]}`;
        return res.status(401).json({
          error: `O período ${checkPeriodo.nome} já está fechado, contate o administrador`,
        });
      }
    }
    try {
      return res.json(await Hora.create(req.body));
    } catch (err) {
      return res.status(500).json({ error: '500: Erro Interno de Servidor' });
    }
  }

  async get(req, res) {
    if (req.query.total === 'true' && req.query.tipo === 'month' && req.params.id) {
      const year = moment().year();
      const month = moment().month();
      const lastDayMonth = getDaysInMonth(new Date(year, month));
      const hora = await Hora.sum('totalApont', {
        where: {
          ColabId: req.params.id,
          dataAtivd: {
            [Op.between]: [`${year}-${month + 1}-${1}`, `${year}-${month + 1}-${lastDayMonth}`],
          },
        },
      });
      // eslint-disable-next-line no-restricted-globals
      if (isNaN(hora)) {
        return res.json('00:00');
      }
      const apontHr = Math.trunc(hora / 60);
      const apontMin = `0${Math.trunc(hora % 60)}`.slice(-2);
      return res.json(`${apontHr}:${apontMin}`);
    } if (req.query.total === 'true' && req.query.tipo === 'project' && req.params.id) {
      const { oport } = req.query;
      const hora = await Hora.sum('totalApont', {
        where: {
          ColabId: req.params.id,
          OportunidadeId: oport,
        },
      });
      // eslint-disable-next-line no-restricted-globals
      if (isNaN(hora)) {
        return res.json('00:00');
      }
      const apontHr = Math.trunc(hora / 60);
      const apontMin = `0${Math.trunc(hora % 60)}`.slice(-2);
      return res.json(`${apontHr}:${apontMin}`);
    } if (req.query.total === 'true' && req.query.tipo === 'gerencial') {
      const year = moment().year();
      const month = moment().month();
      const lastDayMonth = getDaysInMonth(new Date(year, month));
      const hora = await Hora.sum('totalApont', {
        where: {
          dataAtivd: {
            [Op.between]: [`${year}-${month + 1}-${1}`, `${year}-${month + 1}-${lastDayMonth}`],
          },
        },
      });
      // eslint-disable-next-line no-restricted-globals
      if (isNaN(hora)) {
        return res.json('00:00');
      }
      const apontHr = Math.trunc(hora / 60);
      const apontMin = `0${Math.trunc(hora % 60)}`.slice(-2);
      return res.json(`${apontHr}:${apontMin}`);
    } if (req.params.id && req.query.update) {
      const hora = await Hora.findOne({
        where: { id: req.params.id },
        include: [{ model: Oportunidade }, { model: Colab }],
      });
      return res.json(hora);
    } if (req.query.initialDate && req.query.finalDate) {
      if (req.params.id) {
        const { initialDate, finalDate } = req.query;
        const hora = await Hora.findAll({
          where: {
            ColabId: req.params.id,
            dataAtivd: {
              [Op.between]: [initialDate, finalDate],
            },
          },
          include: [{ model: Oportunidade, include: [{ model: Cliente }] }, { model: Colab }],
          order: [['dataAtivd', 'DESC']],
        });
        const area = await Area.findAll();
        for (let i = 0; i < hora.length; i++) {
          const horas = hora[i].dataValues.dataAtivd.split('-');
          hora[i].dataValues.dataAtivd = `${horas[2]}/${horas[1]}/${horas[0]}`;
          const aux = { areaNome: '' };
          const areaNome = area.find((a) => a.id === hora[i].dataValues.AreaId);
          aux.areaNome = areaNome.descArea;
          Object.assign(hora[i].dataValues, aux);
        }
        return res.json(hora);
      }
      const { initialDate, finalDate } = req.query;
      const hora = await Hora.findAll({
        where: {
          dataAtivd: {
            [Op.between]: [initialDate, finalDate],
          },
        },
        include: [{ model: Oportunidade, include: [{ model: Cliente }] }, { model: Colab }],
        order: [['dataAtivd', 'DESC']],
      });

      for (let i = 0; i < hora.length; i++) {
        const horas = hora[i].dataValues.dataAtivd.split('-');
        hora[i].dataValues.dataAtivd = `${horas[2]}/${horas[1]}/${horas[0]}`;
      }
      return res.json(hora);
    }
    return res.json();
  }

  async update(req, res) {
    const hora = await Hora.findByPk(req.params.id);
    const checkPeriodo = await FechamentoPeriodo.findOne({
      where: {
        [Op.and]: [{
          dataFim: {
            [Op.gte]: req.body.dataAtivd,
          },
        },
        {
          dataInic: {
            [Op.lte]: req.body.dataAtivd,
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
        if (decoded.periodo === checkPeriodo.getDataValue('nome')) {
          return res.json(await hora.update(req.body));
        }
        throw 'error';
      } catch (err) {
        const dataAtivdSplit = req.body.dataAtivd.split('-');
        const formatData = `${dataAtivdSplit[2]}-${dataAtivdSplit[1]}-${dataAtivdSplit[0]}`;
        return res.status(401).json({
          error: `O período que contém ${formatData} já está fechado, contate o administrador`,
        });
      }
    }
    return res.json(await hora.update(req.body));
  }

  async delete(req, res) {
    const hora = await Hora.findOne({
      where: { id: req.params.id },
    });
    const checkPeriodo = await FechamentoPeriodo.findOne({
      where: {
        [Op.and]: [{
          dataFim: {
            [Op.gte]: hora.dataAtivd,
          },
        },
        {
          dataInic: {
            [Op.lte]: hora.dataAtivd,
          },
        }],
      },
    });
    const aberto = checkPeriodo.getDataValue('situacao');
    if (aberto !== 'Aberto') {
      const colab = await Colab.findByPk(hora.ColabId);
      if (!colab) {
        return res.status(500).json({ error: 'Erro interno de servidor' });
      }
      try {
        const token = colab.getDataValue('PeriodToken');
        const decoded = await promisify(jwt.verify)(token, process.env.TOKENS_SECRET);
        if (decoded.periodo === checkPeriodo.getDataValue('nome')) {
          hora.destroy();
          return res.status(200).json(`Registro de ${hora.dataAtivd} foi deletado com Sucesso!`);
        }
        throw 'error';
      } catch (err) {
        const dataAtivdSplit = hora.dataAtivd.split('-');
        const formatData = `${dataAtivdSplit[2]}-${dataAtivdSplit[1]}-${dataAtivdSplit[0]}`;
        return res.status(401).json({
          error: `O período que contém ${formatData} já está fechado, contate o administrador`,
        });
      }
    }

    hora.destroy();
    return res.status(200).json(`Registro de ${hora.dataAtivd} foi deletado com Sucesso!`);
  }
}
export default new HoraController();
