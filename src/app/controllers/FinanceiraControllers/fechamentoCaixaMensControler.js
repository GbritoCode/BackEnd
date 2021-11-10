import { getDaysInMonth } from 'date-fns';
import sequelize, { Op } from 'sequelize';
import Cliente from '../../models/cliente';
import FechamentoCaixaMensal from '../../models/fechamentoCaixaMensal';
import Fornec from '../../models/fornec';
import MovimentoCaixa from '../../models/movimentoCaixa';
import RecDesp from '../../models/recDesp';

class FechamentoCaixaController {
  async store(req, res) {
    try {
      // { //////body
      //   mes: int,
      //   ano: int,
      // }
      const { body } = req;

      const lastDayMonth = getDaysInMonth(new Date(`${body.ano}-${body.mes}-01`));
      const inicDate = `${body.ano}-${body.mes}-01`;
      const endDate = `${body.ano}-${body.mes}-${lastDayMonth}`;

      const movTot = await MovimentoCaixa.findOne(
        {
          attributes: [[sequelize.fn('sum', sequelize.col('valor')), 'total']],
          where: {
            dtVenc: { [Op.between]: [inicDate, endDate] },
          },
          // group: 'EmpresaId',
        },
      );

      const movEntSaida = await MovimentoCaixa.findAll(
        {
          attributes: ['recDesp', [sequelize.fn('sum', sequelize.col('valor')), 'total']],
          where: {
            dtVenc: { [Op.between]: [inicDate, endDate] },
          },
          group: 'recDesp',
        },
      );
      const saida = movEntSaida[0].dataValues.recDesp === 'Desp' ? movEntSaida[0].dataValues.total : movEntSaida[1].dataValues.total;
      const entrada = movEntSaida[0].dataValues.recDesp === 'Rec' ? movEntSaida[0].dataValues.total : movEntSaida[1].dataValues.total;
      const fechMes = await FechamentoCaixaMensal.create({
        EmpresaId: body.EmpresaId,
        ano: body.ano,
        periodo: body.mes,
        entrada,
        saida,
        saldoMes: movTot.dataValues.total,
      });

      return res.json({ fechMes, message: 'Mes fechado com sucesso!' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Erro Interno Do Servidor' });
    }
  }

  async get(req, res) {
    try {
      const mov = await MovimentoCaixa.findAll({
        include: [
          { model: RecDesp },
          'ColabCreated',
          'ColabLiquid',
          { model: Fornec },
          { model: Cliente },
        ],
      });

      return res.json(mov);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Erro Interno Do Servidor' });
    }
  }

  async delete(req, res) {
    try {
      const { params } = req;
      const mov = await MovimentoCaixa.findOne({
        where: { id: params.id },
      });
      await mov.destroy();
      return res.json({ mov, message: 'Movimento excluído com sucesso' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Erro Interno Do Servidor' });
    }
  }
}

export default new FechamentoCaixaController();
