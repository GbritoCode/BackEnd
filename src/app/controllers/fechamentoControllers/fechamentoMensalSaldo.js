/* eslint-disable no-restricted-syntax */
import { getDaysInMonth } from 'date-fns';
import sequelize, { Op } from 'sequelize';

import FechamentoCaixaMensal from '../../models/fechamentoCaixaMensal';
import LiquidMovCaixa from '../../models/liquidMovCaixa';
import MovimentoCaixa from '../../models/movimentoCaixa';

export default new class FechamentoMensalSaldo {
  async fechamentoMensal(mes, part, ano) {
    const year = ano || new Date().getFullYear();
    const lastDayThisMonth = getDaysInMonth(new Date(year, parseInt(mes, 10) - 1));

    let somaRec = 0; let somaDesp = 0; let somaSaldo = 0;

    const array = new Array(32).fill(null).map(() => ({
      saldoPrev: null, saldoReal: null, rec: null, desp: null, dia: null,
    }));

    try {
      // --- Opening balance from FechamentoCaixaMensal (previous month's fechamento) ---
      const prevMonth = parseInt(mes, 10) - 1;
      const prevYear = prevMonth === 0 ? year - 1 : year;
      const prevPeriodo = prevMonth === 0 ? 12 : prevMonth;

      const fechamentoAnterior = await FechamentoCaixaMensal.findOne({
        where: {
          periodo: prevPeriodo,
          ano: prevYear,
        },
        order: [['id', 'DESC']],
      });

      let openingReal = 0;
      let openingPrev = 0;

      if (fechamentoAnterior) {
        // Use the stored saldoLastDay from the previous month's fechamento as opening real balance
        openingReal = fechamentoAnterior.saldoLastDay || 0;
        openingPrev = fechamentoAnterior.saldoMesPrev || 0;
      } else {
        // No fechamento exists — calculate opening balances from all historical data

        // Opening saldoPrev: sum of still-pending/partial MovimentoCaixa from before this month
        const movBeforeMonth = await MovimentoCaixa.findAll({
          attributes: ['recDesp', [sequelize.fn('sum', sequelize.col('saldo')), 'total']],
          where: {
            dtVenc: { [Op.lt]: `${year}-${String(mes).padStart(2, '0')}-01` },
            status: { [Op.in]: [1, 2] },
          },
          group: ['recDesp'],
        });

        for (const mov of movBeforeMonth) {
          const { recDesp, total } = mov.dataValues;
          if (recDesp.toLowerCase() === 'rec') openingPrev += total;
          else if (recDesp.toLowerCase() === 'desp') openingPrev += total;
        }

        // Opening saldoReal: sum of all liquidated movements before this month
        const liqBeforeMonth = await LiquidMovCaixa.findAll({
          attributes: ['recDesp', [sequelize.fn('sum', sequelize.col('valor')), 'total']],
          where: {
            dtLiqui: { [Op.lt]: `${year}-${String(mes).padStart(2, '0')}-01` },
          },
          group: ['recDesp'],
        });

        for (const liq of liqBeforeMonth) {
          openingReal += liq.dataValues.total;
        }
      }

      array[0] = {
        saldoPrev: openingPrev,
        saldoReal: openingReal,
        rec: 0,
        desp: 0,
        dia: 0,
      };

      const recDespReal = await LiquidMovCaixa.findAll(
        {
          attributes: ['dtLiqui', 'recDesp', [sequelize.fn('sum', sequelize.col('valor')), 'total']],
          where: {
            dtLiqui: { [Op.between]: [`${year}-${String(mes).padStart(2, '0')}-01`, `${year}-${String(mes).padStart(2, '0')}-${lastDayThisMonth}`] },
          },
          group: ['dtLiqui', 'recDesp'],
        },
      );

      const SaldoPrev = await MovimentoCaixa.findAll(
        {
          attributes: ['dtVenc', 'recDesp', [sequelize.fn('sum', sequelize.col('valor')), 'total']],
          where: {
            dtVenc: { [Op.between]: [`${year}-${String(mes).padStart(2, '0')}-01`, `${year}-${String(mes).padStart(2, '0')}-${lastDayThisMonth}`] },
          },
          group: ['dtVenc', 'recDesp'],
        },
      );

      // eslint-disable-next-line no-restricted-syntax
      for (const mv of SaldoPrev) {
        const day = parseInt(mv.dataValues.dtVenc.split('-')[2], 10);
        const { recDesp, total } = mv.dataValues;
        if (array[day].saldoPrev === null) {
          array[day].saldoPrev = 0;
        }
        if (recDesp.toLowerCase() === 'rec') {
          array[day].saldoPrev += total;
        } else if (recDesp.toLowerCase() === 'desp') {
          array[day].saldoPrev -= total;
        }
      }

      for (const recDespLiqui of recDespReal) {
        const { dtLiqui, recDesp, total } = recDespLiqui.dataValues;
        const day = parseInt(dtLiqui.split('-')[2], 10);
        if (recDesp === 'Rec') {
          array[day].rec = (array[day].rec || 0) + total;
        } else if (recDesp === 'Desp') {
          array[day].desp = (array[day].desp || 0) + total;
        }
        array[day].saldoReal = (array[day].saldoReal || 0) + total;
      }

      const arraySaldo = []; const arrayRec = []; const arrayDesp = []; const
        arraySaldoPrev = [];
      for (let i = 0; i < 32; i++) {
        if (array[i].saldoPrev === null) {
          array[i].saldoPrev = array[i - 1].saldoPrev;
        } else if (array[i].saldoPrev !== null && i > 0) {
          array[i].saldoPrev += array[i - 1].saldoPrev;
        }

        // ------

        if (array[i].saldoReal === null) {
          array[i].saldoReal = array[i - 1].saldoReal;
        } else if (array[i].saldoReal !== null && i > 0) {
          array[i].saldoReal += array[i - 1].saldoReal;
        }
        if (array[i].rec === null) {
          array[i].rec = 0;
        }
        if (array[i].desp === null) {
          array[i].desp = 0;
        }
        array[i].dia = i;
        arraySaldo[i] = (array[i].saldoReal).toFixed(2);
        arraySaldoPrev[i] = (array[i].saldoPrev).toFixed(2);
        arrayDesp[i] = (array[i].desp).toFixed(2);
        arrayRec[i] = (array[i].rec).toFixed(2);
        if (i > 0) {
          somaRec += (array[i].rec);
          somaDesp += (array[i].desp);
        }
      }

      somaSaldo = somaRec + somaDesp;
      if (part === '1q') {
        arraySaldo.splice(16);
        arraySaldoPrev.splice(16);
        arrayRec.splice(16);
        arrayDesp.splice(16);
      } else if (part === '2q') {
        arraySaldo.splice(0, 15);
        arraySaldoPrev.splice(0, 15);
        arrayRec.splice(0, 15);
        arrayDesp.splice(0, 15);
      }

      somaSaldo = somaSaldo.toFixed(2);
      somaRec = somaRec.toFixed(2);
      somaDesp = somaDesp.toFixed(2);

      return {
        status: 'ok',
        arraySaldo,
        arraySaldoPrev,
        arrayRec,
        arrayDesp,
        somaSaldo,
        somaRec,
        somaDesp,
      };
    } catch (err) {
      console.log(err);
      return { status: 'error', err };
    }
  }
}();
