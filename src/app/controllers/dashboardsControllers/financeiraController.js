/* eslint-disable no-restricted-syntax */
import sequelize, { Op } from 'sequelize';

import LiquidMovCaixa from '../../models/liquidMovCaixa';
import MovimentoCaixa from '../../models/movimentoCaixa';
import FechamentoMensalSaldo from '../fechamentoControllers/fechamentoMensalSaldo';

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
      const movPrev = await MovimentoCaixa.findAll({
        attributes: ['dtVenc', 'recDesp', [sequelize.fn('sum', sequelize.col('valor')), 'total']],
        where: {
          dtVenc: { [Op.between]: [`${ano}-01-01`, `${ano}-12-31`] },
        },
        group: ['dtVenc', 'recDesp'],
      });

      const recDespReal = await LiquidMovCaixa.findAll({
        attributes: ['dtLiqui', 'recDesp', [sequelize.fn('sum', sequelize.col('valor')), 'total']],
        where: {
          dtLiqui: { [Op.between]: [`${ano}-01-01`, `${ano}-12-31`] },
        },
        group: ['dtLiqui', 'recDesp'],
      });

      for (const mv of movPrev) {
        const monthVenc = parseInt(mv.dataValues.dtVenc.split('-')[1], 10);
        const { recDesp, total } = mv.dataValues;
        if (array[monthVenc].saldoPrev === null) {
          array[monthVenc].saldoPrev = 0;
        }
        if (recDesp.toLowerCase() === 'rec') {
          array[monthVenc].saldoPrev += total;
        } else if (recDesp.toLowerCase() === 'desp') {
          array[monthVenc].saldoPrev -= total;
        }
      }

      for (const liq of recDespReal) {
        const { dtLiqui, recDesp, total } = liq.dataValues;
        const monthLiqui = parseInt(dtLiqui.split('-')[1], 10);
        if (array[monthLiqui].saldoReal === null) {
          array[monthLiqui].saldoReal = 0;
        }
        if (recDesp === 'Rec') {
          array[monthLiqui].rec = (array[monthLiqui].rec || 0) + total;
        } else if (recDesp === 'Desp') {
          // valor is stored negative for Desp; negate to get positive absolute value
          array[monthLiqui].desp = (array[monthLiqui].desp || 0) - total;
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
        if (array[i].saldoReal === null) {
          array[i].saldoReal = 0;
        }

        arraySaldo[i] = (array[i].saldoReal).toFixed(2);
        arraySaldoPrev[i] = (array[i].saldoPrev).toFixed(2);
        arrayDesp[i] = (array[i].rec).toFixed(2);
        arrayRec[i] = (array[i].desp).toFixed(2);
        somaRec += (array[i].rec);
        somaDesp += (array[i].desp);
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

      somaSaldo = somaSaldo.toFixed(2);
      somaRec = somaRec.toFixed(2);
      somaDesp = somaDesp.toFixed(2);

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
    try {
      const data = await FechamentoMensalSaldo.fechamentoMensal(mes, part);
      return res.status(200).json(data);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Erro Interno do Servidor' });
    }
  }
}
export default new FinanceiraController();
