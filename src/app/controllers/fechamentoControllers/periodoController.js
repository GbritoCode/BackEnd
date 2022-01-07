/* eslint-disable no-restricted-syntax */
import { getDaysInMonth } from 'date-fns';
import sequelize, { Op } from 'sequelize';
import * as yup from 'yup';
import { monthFullToNumber } from '../../../generalVar';
import Colab from '../../models/colab';
import Despesas from '../../models/despesas';
import Empresa from '../../models/empresa';
import FechamentoCaixaMensal from '../../models/fechamentoCaixaMensal';
import FechamentoPeriodo from '../../models/fechamentoPeriodos';
import Fornec from '../../models/fornec';
import Horas from '../../models/horas';
import LiquidMovCaixa from '../../models/liquidMovCaixa';
import MovimentoCaixa from '../../models/movimentoCaixa';
import Oportunidade from '../../models/oportunidade';
import Parametros from '../../models/parametros';
import RecDesp from '../../models/recDesp';
import Recurso from '../../models/recurso';
import ResultPeriodo from '../../models/resultPeriodo';
import ResultPeriodoGerencial from '../../models/resultPeriodoGerencial';

class FechamentoPeriodoController {
  async store(req, res) {
    if (req.query.auto === 'true' && req.query.tipo === 'mensal') {
      const year = req.body.ano;
      const valueExists = await FechamentoPeriodo.findOne({
        where: {
          dataInic: `${year}-01-01`,
        },
      });
      if (valueExists) {
        return res.status(400).json({ error: 'Esse periodo já existe' });
      }

      const lastDayMonth = getDaysInMonth(new Date(year, 1));
      await FechamentoPeriodo.bulkCreate([
        {
          ano: year, EmpresaId: 1, aberto: true, nome: 'Janeiro', dataInic: `${year}-01-01`, dataFim: `${year}-01-31`,
        },
        {
          ano: year, EmpresaId: 1, aberto: true, nome: 'Fevereiro', dataInic: `${year}-02-01`, dataFim: `${year}-02-${lastDayMonth}`,
        },
        {
          ano: year, EmpresaId: 1, aberto: true, nome: 'Março', dataInic: `${year}-03-01`, dataFim: `${year}-03-31`,
        },
        {
          ano: year, EmpresaId: 1, aberto: true, nome: 'Abril', dataInic: `${year}-04-01`, dataFim: `${year}-04-30`,
        },
        {
          ano: year, EmpresaId: 1, aberto: true, nome: 'Maio', dataInic: `${year}-05-01`, dataFim: `${year}-05-31`,
        },
        {
          ano: year, EmpresaId: 1, aberto: true, nome: 'Junho', dataInic: `${year}-06-01`, dataFim: `${year}-06-30`,
        },
        {
          ano: year, EmpresaId: 1, aberto: true, nome: 'Julho', dataInic: `${year}-07-01`, dataFim: `${year}-07-31`,
        },
        {
          ano: year, EmpresaId: 1, aberto: true, nome: 'Agosto', dataInic: `${year}-08-01`, dataFim: `${year}-08-31`,
        },
        {
          ano: year, EmpresaId: 1, aberto: true, nome: 'Setembro', dataInic: `${year}-09-01`, dataFim: `${year}-09-30`,
        },
        {
          ano: year, EmpresaId: 1, aberto: true, nome: 'Outubro', dataInic: `${year}-10-01`, dataFim: `${year}-10-31`,
        },
        {
          ano: year, EmpresaId: 1, aberto: true, nome: 'Novembro', dataInic: `${year}-11-01`, dataFim: `${year}-11-30`,
        },
        {
          ano: year, EmpresaId: 1, aberto: true, nome: 'Dezembro', dataInic: `${year}-12-01`, dataFim: `${year}-12-31`,
        },
      ], { returning: true })
        .then((result) => res.json(result));
    }
    if (!req.query.auto) {
      const schema = yup.object().shape({
        EmpresaId: yup.string().required(),
        nome: yup.string().required(),
        dataInic: yup.date().required(),
        dataFim: yup.date().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation Fails' });
      }

      const {
        EmpresaId, nome, dataInic, dataFim,
      } = await FechamentoPeriodo.create(req.body);

      return res.json({
        EmpresaId,
        nome,
        dataInic,
        dataFim,
      });
    }
  }

  async get(req, res) {
    if (!req.params.id) {
      const periodo = await FechamentoPeriodo.findAll({ include: Empresa, order: [['dataInic']] });
      for (let i = 0; i < periodo.length; i++) {
        const dataInicPeriodo = periodo[i].dataValues.dataInic.split('-');
        periodo[i].dataValues.dataInic = `${dataInicPeriodo[2]}/${dataInicPeriodo[1]}/${dataInicPeriodo[0]}`;
        const dataFimPeriodo = periodo[i].dataValues.dataFim.split('-');
        periodo[i].dataValues.dataFim = `${dataFimPeriodo[2]}/${dataFimPeriodo[1]}/${dataFimPeriodo[0]}`;
      }

      return res.json(periodo);
    }
    const periodo = await FechamentoPeriodo.findOne({ where: { id: req.params.id } });
    return res.json(periodo);
  }

  async update(req, res) {
    // return res.status(500).json({ error: 'Erro Interno do Servidor' });
    const fechamento = await FechamentoPeriodo.findByPk(req.params.id);

    const periodoAnt = await FechamentoPeriodo.findByPk(req.params.id - 1);

    if (periodoAnt) {
      if (periodoAnt.situacao !== 'Fechado') {
        return res.status(500).json({ error: 'O período anterior não está fechado, por favor feche antes de continuar' });
      }
    }

    const emp = await Empresa.findOne({
      where: {
        id: fechamento.getDataValue('EmpresaId'),
      },
    });
    console.log(emp);

    let nextMonth;
    const data = [];

    const periodMonth = monthFullToNumber[fechamento.nome];

    const colabs = await Colab.findAll({ include: [{ model: Fornec }] });

    const param = await Parametros.findOne();
    const {
      pgmtoVenc, compHrs, compFlag, RecDespCompHrs,
    } = param;

    console.log(periodMonth);
    if (periodMonth === 12) {
      nextMonth = new Date(parseInt(fechamento.ano, 10) + 1, 0, pgmtoVenc);
    } else {
      nextMonth = new Date(fechamento.ano, periodMonth, pgmtoVenc);
    }
    // return res.json;
    await FechamentoCaixaMensal.destroy({
      where: {
        periodo: periodMonth,
        ano: fechamento.ano,
      },
    });

    await MovimentoCaixa.destroy({
      where: {
        ColabPgmto: { [Op.not]: null },
        periodo: periodMonth,
        ano: fechamento.ano,
      },
    });

    await Horas.destroy(
      {
        where: {
          compFlag: 1,
          dataAtivd: { [Op.between]: [fechamento.dataInic, fechamento.dataFim] },
        },
      },
    );
    await ResultPeriodo.update({
      totalHrs: 0,
      totalDesp: 0,
      totalReceb: 0,
    },
    {
      where: {
        periodo: fechamento.nome, ano: fechamento.ano,
      },
    });
    await ResultPeriodoGerencial.update({
      totalHrs: 0,
      totalDesp: 0,
      totalReceb: 0,
    },
    {
      where: {
        periodo: fechamento.nome, ano: fechamento.ano,
      },
    });

    await Colab.update({ PeriodToken: '' }, { where: { id: { [Op.not]: null } } });

    // ----------------------horas
    const horas = await fechamento.sequelize.models.Horas.findAll({
      where: {
        dataAtivd: { [Op.between]: [fechamento.dataInic, fechamento.dataFim] },
        // compFlag: { [Op.ne]: 1 },
      },
      attributes: [
        'ColabId',
        [sequelize.fn('sum', sequelize.col('totalApont')), 'total'],
      ],
      group: ['ColabId'],
    });
    if (horas.length > 0) {
      for (let i = 0; i < horas.length; i++) {
        data[i] = {
          ColabId: horas[i].dataValues.ColabId,
          totalHrs: horas[i].dataValues.total,
          totalDesp: 0,
          totalReceb: 0,
        };
      }
    } else {
      data[0] = {
        ColabId: 0,
        totalHrs: 0,
        totalDesp: 0,
        totalReceb: 0,
      };
    }

    // --------------------despesas
    const despesas = await Despesas.findAll({
      where: {
        dataDespesa: { [Op.between]: [fechamento.dataInic, fechamento.dataFim] },
      },
      attributes: [
        'ColabId',
        [sequelize.fn('sum', sequelize.col('valorDespesa')), 'total'],
      ],
      group: ['ColabId'],
    });
    if (despesas.length > 0) {
      for (let i = 0; i < despesas.length; i++) {
        Object.entries(data).forEach((entry) => {
          if (entry[1].ColabId === despesas[i].dataValues.ColabId) {
            entry[1].totalDesp = despesas[i].dataValues.total;
          }
          if ((data.find((d) => d.ColabId === despesas[i].dataValues.ColabId)) === undefined) {
            data.push({
              ColabId: despesas[i].dataValues.ColabId,
              totalHrs: 0,
              totalDesp: despesas[i].dataValues.total,
              totalReceb: despesas[i].dataValues.total,
            });
          }
        });
      }
    } else {
      Object.entries(data).forEach((entry) => {
        entry[1].totalDesp = 0;
      });
    }
    // --------------------Receber

    const receber = await fechamento.sequelize.models.Colab.findAll({
      include: [{
        model: Recurso,
        required: true,
        include: [{
          model: Horas,
          where: {
            dataAtivd: {
              [Op.between]: [fechamento.dataInic, fechamento.dataFim],
            },
          },
          required: true,
        }],
      }],
    });
    const sum = [];
    let sumColab = 0;
    for (let i = 0; i < receber.length; i++) {
      sumColab = 0;
      for (let j = 0; j < receber[i].Recursos.length; j++) {
        for (let k = 0; k < receber[i].Recursos[j].Horas.length; k++) {
          sumColab += (receber[i].Recursos[j].Horas[k].dataValues.totalApont / 60)
          * receber[i].Recursos[j].dataValues.colabVlrHr;
        }
      }
      sum[i] = Math.trunc(sumColab);
      Object.entries(data).forEach((entry) => {
        if (entry[1].ColabId === receber[i].dataValues.id) {
          entry[1].totalReceb = parseInt(sum[i], 10) + parseInt(entry[1].totalDesp, 10);
        }
        if ((data.find((d) => d.ColabId === receber[i].dataValues.id)) === undefined) {
          data.push({
            ColabId: receber[i].dataValues.id,
            totalHrs: 0,
            totalDesp: 0,
            totalReceb: sum[i],
          });
        }
      });
    }

    Object.entries(data).forEach((entry) => {
      entry[1].periodo = fechamento.nome;
      entry[1].EmpresaId = fechamento.EmpresaId;
    });

    const alreadyHasPeriodo = await fechamento.sequelize.models.ResultPeriodo.findOne({
      where: { [Op.and]: [{ periodo: fechamento.nome }, { ano: fechamento.ano }] },
    });
    if (alreadyHasPeriodo) {
      Object.entries(data).forEach(async (entry) => {
        await ResultPeriodo.update(
          {
            totalHrs: entry[1].totalHrs,
            totalDesp: entry[1].totalDesp,
            totalReceb: entry[1].totalReceb,
          },
          {
            where: {
              [Op.and]: [{ ColabId: entry[1].ColabId },
                { periodo: fechamento.nome }, { ano: fechamento.ano }],
            },
          },
        );
        const colabAtual = colabs.find((arr) => arr.id === entry[1].ColabId);
        if (entry[1].totalReceb - entry[1].totalDesp > 0) {
          console.log(colabAtual.Fornec.getDataValue('id'));
          await MovimentoCaixa.create(
            {
              EmpresaId: fechamento.EmpresaId,
              RecDespId: colabAtual.Fornec.getDataValue('RecDespId'),
              FornecId: colabAtual.Fornec.getDataValue('id'),
              ColabCreate: 1,
              ColabPgmto: entry[1].ColabId,
              valor: ((entry[1].totalReceb - entry[1].totalDesp) * -1),
              saldo: ((entry[1].totalReceb - entry[1].totalDesp) * -1),
              dtVenc: nextMonth,
              status: 1,
              ano: fechamento.ano,
              periodo: periodMonth,
              recDesp: 'Desp',
              autoCreated: true,
              desc:
                 `Valor referente a horas lançadas pelo colaborador ${colabAtual.nome} no período ${fechamento.nome} - ${fechamento.ano}`,
            },
            { returning: true },
          );
        }
        // .then((result) => console.log(result));
      });
    } else {
      await fechamento.sequelize.models.ResultPeriodo.bulkCreate(data, { updateOnDuplicate: ['periodo'] }, { returning: true });
    }

    const despesasSeparate = await Despesas.findAll(
      {
        where: {
          dataDespesa: { [Op.between]: [fechamento.dataInic, fechamento.dataFim] },
        },
        attributes: [
          'ColabId',
          // 'RecDesp.id',
          [sequelize.fn('sum', sequelize.col('valorDespesa')), 'total'],
        ],
        include: [{ model: RecDesp }],
        group: ['ColabId', 'RecDesp.id'],
      },
    );
    console.log('teste');
    // return res.json(despesasSeparate);

    // eslint-disable-next-line guard-for-in
    for (let i = 0; i < despesasSeparate.length; i++) {
      const desp = despesasSeparate[i].dataValues;
      await MovimentoCaixa.create(
        {
          EmpresaId: fechamento.EmpresaId,
          RecDespId: desp.RecDesp.id,
          FornecId: colabs.find((arr) => arr.id === desp.ColabId).Fornec.id,
          ColabCreate: 1,
          ColabPgmto: desp.ColabId,
          valor: (desp.total * -1),
          saldo: (desp.total * -1),
          dtVenc: nextMonth,
          status: 1,
          ano: fechamento.ano,
          periodo: periodMonth,
          recDesp: 'Desp',
          autoCreated: true,
          desc:
           `Valor referente a despesas ${desp.RecDesp.desc} do colaborador ${colabs.find((arr) => arr.id === desp.ColabId).nome} no período ${fechamento.nome} - ${fechamento.ano}`,
        },
        { returning: true },
      );
    }

    if (compFlag) {
      const totalHrsMes = compHrs * 60;
      const compRec = await Recurso.findAll(
        {
          where: { tipoAtend: 4 },
          include:
             [
               {
                 model: Colab,
               },
               {
                 model: Oportunidade,
                 where: { fase: 4 },
               },
             ],
        },
      );
      for (let i = 0; i < compRec.length; i++) {
        let hrsLancadas = 0;
        const colabId = compRec[i].Colab.id;
        for (let j = 0; j < data.length; j++) {
          if (data[j].ColabId === colabId) {
            hrsLancadas = data[j].totalHrs;
          }
        }

        const saldoHrs = totalHrsMes - hrsLancadas;

        if (saldoHrs > 0) {
          await Horas.create({
            OportunidadeId: compRec[i].OportunidadeId,
            ColabId: colabId,
            RecursoId: compRec[i].id,
            dataAtivd: `${fechamento.ano}-${periodMonth}-01`,
            horaInic: '00:00',
            horaIntrv: '00:00',
            horaFim: '00:00',
            dataLancamento: `${fechamento.ano}-${periodMonth}-01`,
            totalApont: saldoHrs,
            solicitante: emp.getDataValue('nome'),
            AreaId: 1,
            compFlag: 1,
            desc: `Lançamento de Horas complementares ${saldoHrs / 60}`,
          });
          await ResultPeriodo.increment(
            {
              totalHrs: saldoHrs,
              totalReceb: (saldoHrs / 60) * compRec[i].colabVlrHr,
            },
            {
              where: {
                [Op.and]: [{ ColabId: colabId },
                  { periodo: fechamento.nome }, { ano: fechamento.ano }],
              },
            },
            { returning: true },
          );

          await MovimentoCaixa.create(
            {
              EmpresaId: fechamento.EmpresaId,
              RecDespId: RecDespCompHrs,
              FornecId: colabs.find((arr) => arr.id === colabId).Fornec.getDataValue('id'),
              ColabCreate: 1,
              ColabPgmto: colabId,
              valor: (saldoHrs / 60) * compRec[i].colabVlrHr * -1,
              saldo: (saldoHrs / 60) * compRec[i].colabVlrHr * -1,
              dtVenc: nextMonth,
              status: 1,
              ano: fechamento.ano,
              periodo: periodMonth,
              recDesp: 'Desp',
              autoCreated: true,
              desc:
               `Valor referente a horas complementares do colaborador ${colabs.find((arr) => arr.id === colabId).nome} no período ${fechamento.nome} - ${fechamento.ano}`,
            },
            { returning: true },
          );
        }
      }
    }

    try {
      const result = await ResultPeriodo.findAll({
        where: { ano: fechamento.ano, periodo: fechamento.nome },
        attributes: [
          'periodo',
          [sequelize.fn('sum', sequelize.col('totalHrs')), 'totalHrs'],
          [sequelize.fn('sum', sequelize.col('totalDesp')), 'totalDesp'],
          [sequelize.fn('sum', sequelize.col('totalReceb')), 'totalReceb'],
        ],
        group: ['periodo'],
      });

      await ResultPeriodoGerencial.update(
        {
          totalHrs: result[0].dataValues.totalHrs,
          totalDesp: result[0].dataValues.totalDesp,
          totalReceb: result[0].dataValues.totalReceb,
        },
        {
          where: {
            [Op.and]: [{ periodo: fechamento.nome }, { ano: fechamento.ano }],
          },
        },
        { returning: true },
      );

      //-------------------------------------
      //-------------------------------------
      //-------------------------------------
      //-------------------------------------
      //-------------------------------------

      const caixaPrev = await MovimentoCaixa.findAll(
        {
          attributes: ['recDesp', [sequelize.fn('sum', sequelize.col('valor')), 'total']],
          where: { dtVenc: { [Op.between]: [fechamento.dataInic, fechamento.dataFim] } },
          group: 'recDesp',
        },
      );

      let saldoPrev = 0;
      let entradaPrev = 0;
      let saidaPrev = 0;
      for (const prev of caixaPrev) {
        saldoPrev += prev.dataValues.total;
        if (prev.dataValues.recDesp === 'Desp') {
          saidaPrev += prev.dataValues.total;
        } else if (prev.dataValues.recDesp === 'Rec') {
          entradaPrev += prev.dataValues.total;
        }
      }

      const caixaReal = await LiquidMovCaixa.findAll(
        {
          attributes: ['recDesp', [sequelize.fn('sum', sequelize.col('valor')), 'total']],
          where: { dtLiqui: { [Op.between]: [fechamento.dataInic, fechamento.dataFim] } },
          group: 'recDesp',
        },
      );

      let saldoReal = 0;
      let entradaReal = 0;
      let saidaReal = 0;
      for (const real of caixaReal) {
        saldoReal += real.dataValues.total;
        if (real.dataValues.recDesp === 'Desp') {
          saidaReal += real.dataValues.total;
        } else if (real.dataValues.recDesp === 'Rec') {
          entradaReal += real.dataValues.total;
        }
      }

      const fechMes = await FechamentoCaixaMensal.create({
        EmpresaId: fechamento.EmpresaId,
        ano: fechamento.ano,
        periodo: periodMonth,
        entrada: entradaReal,
        saida: saidaReal,
        saldoMes: saldoReal,
        entradaPrev,
        saidaPrev,
        saldoMesPrev: saldoPrev,
      });

      //-------------------------------------
      //-------------------------------------
      //-------------------------------------
      //-------------------------------------

      const {
        EmpresaId, nome, dataInic, dataFim,
      } = await fechamento.update(req.body);

      return res.json({
        EmpresaId,
        nome,
        dataInic,
        dataFim,
      });
    } catch (err) {
      console.log(err);
      return res.status(500);
    }
  }

  async delete(req, res) {
    const periodo = await FechamentoPeriodo.findOne({
      where: { id: req.params.id },
    });
    if (periodo.Segmento === null) {
      periodo.destroy();
      return res.status(200).json(`Registro ${periodo.nome} foi deletado com Sucesso!`);
    }
    return res.status(400).json({ error: 'Registro possui dependências. Exclusão não permitida' });
  }
}
export default new FechamentoPeriodoController();
