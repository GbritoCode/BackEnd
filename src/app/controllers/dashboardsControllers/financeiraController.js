import sequelize, { Op } from 'sequelize';

import FechamentoCaixaMensal from '../../models/fechamentoCaixaMensal';
import MovimentoCaixa from '../../models/movimentoCaixa';

class FinanceiraController {
  async get(req, res) {
    const { query } = req;
    const {
      camp, inicDate, endDate, mes, ano,
    } = query;
    const arraySaldo = new Array(32);
    try {
      const fechMes = await FechamentoCaixaMensal.findOne(
        {
          where: {
            ano: parseInt(ano, 10),
            periodo: (mes - 1).toString(),
          },
        },
      );

      arraySaldo.fill(fechMes.dataValues.saldoMes);

      const movRecDesp = await MovimentoCaixa.findAll(
        {
          attributes: ['dtVenc', 'recDesp', [sequelize.fn('sum', sequelize.col('valor')), 'total']],
          where: {
            dtVenc: { [Op.between]: ['2021-10-01', '2021-10-31'] },
          },
          group: ['dtVenc', 'recDesp'],
        },
      );

      const movSaldo = await MovimentoCaixa.findAll(
        {
          attributes: ['dtVenc', [sequelize.fn('sum', sequelize.col('valor')), 'total']],
          where: {
            dtVenc: { [Op.between]: ['2021-10-01', '2021-10-31'] },
          },
          group: ['dtVenc'],
        },
      );

      // eslint-disable-next-line no-restricted-syntax
      for (const mv of movSaldo) {
        const day = mv.dataValues.dtVenc.split('-')[2];
        const soma = mv.dataValues.total + arraySaldo[day];
        console.log(soma);
        arraySaldo.fill(soma, day);
        // arraySaldo[day] = mv.dataValues.total;
      }

      return res.json({
        arraySaldo,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err: 'Erro Interno do Servidor' });
    }
  }
}
export default new FinanceiraController();
