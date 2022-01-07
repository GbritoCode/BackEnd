/* eslint-disable no-restricted-syntax */
import { getDaysInMonth } from 'date-fns';
import sequelize, { Op } from 'sequelize';

import FechamentoCaixaMensal from '../../models/fechamentoCaixaMensal';
import LiquidMovCaixa from '../../models/liquidMovCaixa';
import MovimentoCaixa from '../../models/movimentoCaixa';

const today = new Date();
const [, month, year] = today.toLocaleDateString('pt-BR').split('/');
const lastDayMonth = getDaysInMonth(today);
class FinanceiraController {
  async getAnual(req, res) {
    const { query } = req;
    const { ano, part } = query;

    const array = new Array(13).fill(null).map(() => ({
      saldoPrev: null, saldoReal: null, rec: null, desp: null,
    }));

    let somaRec = 0; let somaDesp = 0; let somaSaldo = 0;
    const arraySaldo = []; const arrayRec = []; const arrayDesp = []; const
      arraySaldoPrev = [];

    try {
      const fechMes = await FechamentoCaixaMensal.findAll(
        {
          where: {
            ano: parseInt(ano, 10),
          },
        },
      );

      for (const fech of fechMes) {
        const {
          periodo, saldoMesPrev, saldoMes, entrada, saida,
        } = fech.dataValues;

        array[periodo] = {
          saldoPrev: saldoMesPrev,
          saldoReal: saldoMes,
          rec: entrada,
          desp: saida,
        };
      }

      for (let i = 1; i < 13; i++) {
        if (array[i].saldoPrev === null) {
          array[i].saldoPrev = 0;
        }
        // else if (array[i].saldoPrev !== null && i > 0) {
        //   array[i].saldoPrev += array[i - 1].saldoPrev;
        // }

        // ------

        if (array[i].rec === null) {
          array[i].rec = 0;
        }
        if (array[i].desp === null) {
          array[i].desp = 0;
        }

        arraySaldo[i] = array[i].saldoReal;
        arraySaldoPrev[i] = array[i].saldoPrev;
        arrayDesp[i] = array[i].rec;
        arrayRec[i] = array[i].desp;
      }

      const SaldoPrev = await MovimentoCaixa.findAll(
        {
          attributes: ['dtVenc', 'periodo', [sequelize.fn('sum', sequelize.col('valor')), 'total']],
          where: {
            dtVenc: { [Op.between]: [`${ano}-${month}-01`, `${ano}-${month}-${lastDayMonth}`] },
          },
          group: ['dtVenc', 'periodo'],
        },
      );
      console.log(ano);
      console.log(month);
      console.log(SaldoPrev);

      const recDespReal = await LiquidMovCaixa.findAll(
        {
          attributes: ['dtLiqui', 'recDesp', [sequelize.fn('sum', sequelize.col('valor')), 'total']],
          where: {
            dtLiqui: { [Op.between]: [`${ano}-${month}-01`, `${ano}-${month}-${lastDayMonth}`] },
          },
          group: ['dtLiqui', 'recDesp'],
        },
      );

      for (const mv of SaldoPrev) {
        const monthVenc = parseInt(mv.dataValues.dtVenc.split('-')[1], 10);
        array[monthVenc].saldoPrev = mv.dataValues.total;
      }

      for (const recDespLiqui of recDespReal) {
        const { dtLiqui, recDesp, total } = recDespLiqui.dataValues;
        const monthLiqui = parseInt(dtLiqui.split('-')[1], 10);
        if (recDesp === 'Rec') {
          array[monthLiqui].rec = total;
        } else if (recDesp === 'Desp') {
          array[monthLiqui].desp = total;
        }
        array[monthLiqui].saldoReal += total;
      }

      for (let i = 1; i < 13; i++) {
        if (array[i].saldoPrev === null) {
          array[i].saldoPrev = 0;
        }

        if (array[i].rec === null) {
          array[i].rec = 0;
        }
        if (array[i].desp === null) {
          array[i].desp = 0;
        }

        arraySaldo[i] = (array[i].saldoReal).toFixed(2);
        arraySaldoPrev[i] = (array[i].saldoPrev).toFixed(2);
        arrayDesp[i] = (array[i].desp).toFixed(2);
        arrayRec[i] = (array[i].rec).toFixed(2);
        somaRec += (array[i].rec).toFixed(2);
        somaDesp += (array[i].desp).toFixed(2);
      }
      somaSaldo = somaRec + somaDesp;

      arraySaldo.shift();
      arraySaldoPrev.shift();
      arrayRec.shift();
      arrayDesp.shift();

      if (part === '1sem') {
        arraySaldo.splice(7);
        arraySaldoPrev.splice(7);
        arrayRec.splice(7);
        arrayDesp.splice(7);
      } else if (part === '2sem') {
        arraySaldo.splice(0, 6);
        arraySaldoPrev.splice(0, 6);
        arrayRec.splice(0, 6);
        arrayDesp.splice(0, 6);
      }

      return res.json({
        arraySaldo, arraySaldoPrev, arrayRec, arrayDesp, somaSaldo, somaRec, somaDesp,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err: 'Erro Interno do Servidor' });
    }
  }

  async getMensal(req, res) {
    const { query } = req;
    const {
      mes, part,
    } = query;

    const lastDayThisMonth = getDaysInMonth(new Date(year, mes));

    let somaRec = 0; let somaDesp = 0; let somaSaldo = 0;

    const array = new Array(32).fill(null).map(() => ({
      saldoPrev: null, saldoReal: null, rec: null, desp: null, dia: null,
    }));

    try {
      const fechMes = await FechamentoCaixaMensal.findOne(
        {
          where: {
            ano: mes === '01' ? parseInt(year, 10) - 1 : parseInt(year, 10),
            periodo: mes === '01' ? 12 : parseInt(mes - 1, 10),
          },
        },
      );
      if (fechMes) {
        const {
          saldoMesPrev, saldoMes, entrada, saida,
        } = fechMes.dataValues;
        array[0] = {
          saldoPrev: saldoMesPrev,
          saldoReal: saldoMes,
          rec: entrada,
          desp: saida,
          dia: 0,
        };
      } else if (!fechMes) {
        array[0] = {
          saldoPrev: 0,
          saldoReal: 0,
          rec: 0,
          desp: 0,
          dia: 0,
        };
      }
      // return res.json(array);
      const recDespReal = await LiquidMovCaixa.findAll(
        {
          attributes: ['dtLiqui', 'recDesp', [sequelize.fn('sum', sequelize.col('valor')), 'total']],
          where: {
            dtLiqui: { [Op.between]: [`${year}-${mes}-01`, `${year}-${mes}-${lastDayThisMonth}`] },
          },
          group: ['dtLiqui', 'recDesp'],
        },
      );

      const SaldoPrev = await MovimentoCaixa.findAll(
        {
          attributes: ['dtVenc', [sequelize.fn('sum', sequelize.col('valor')), 'total']],
          where: {
            dtVenc: { [Op.between]: [`${year}-${mes}-01`, `${year}-${mes}-${lastDayThisMonth}`] },
          },
          group: ['dtVenc'],
        },
      );

      // eslint-disable-next-line no-restricted-syntax
      for (const mv of SaldoPrev) {
        const day = parseInt(mv.dataValues.dtVenc.split('-')[2], 10);
        array[day].saldoPrev = mv.dataValues.total;
      }

      for (const recDespLiqui of recDespReal) {
        const { dtLiqui, recDesp, total } = recDespLiqui.dataValues;
        const day = parseInt(dtLiqui.split('-')[2], 10);
        if (recDesp === 'Rec') {
          array[day].rec = total;
        } else if (recDesp === 'Desp') {
          array[day].desp = total;
        }
        array[day].saldoReal += total;
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
        console.log(array[i].saldoReal);
        arraySaldo[i] = (array[i].saldoReal).toFixed(2);
        arraySaldoPrev[i] = (array[i].saldoPrev).toFixed(2);
        arrayDesp[i] = (array[i].desp).toFixed(2);
        arrayRec[i] = (array[i].rec).toFixed(2);
        if (i > 0) {
          somaRec += (array[i].rec).toFixed(2);
          somaDesp += (array[i].desp).toFixed(2);
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

      return res.json({
        arraySaldo, arraySaldoPrev, arrayRec, arrayDesp, somaSaldo, somaRec, somaDesp,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err: 'Erro Interno do Servidor' });
    }
  }
}
export default new FinanceiraController();
