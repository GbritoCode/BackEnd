import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import { monthFullToNumber } from '../../../generalVar';
import Colabs from '../../models/colab';
import FechamentoPeriodo from '../../models/fechamentoPeriodos';
import LiquidMovCaixa from '../../models/liquidMovCaixa';
import MovimentoCaixa from '../../models/movimentoCaixa';

class PeriodoTokenController {
  async store(req, res) {
    try {
      const { ColabId, periodo, ano } = req.body;
      const colab = await Colabs.findByPk(ColabId);

      if (!colab || !periodo || !ano) {
        return res.status(500).json({ error: 'Erro interno de servidor' });
      }

      const colabPgmto = await MovimentoCaixa.findAll({
        where: {
          ColabPgmto: ColabId,
          periodo: monthFullToNumber[periodo],
          ano,
        },
        include: [LiquidMovCaixa],
      });

      const hasLiquidations = colabPgmto.some((pgmto) => pgmto.LiquidMovCaixas.length !== 0);
      if (hasLiquidations) {
        return res.status(400).json({ error: 'O colaborador já possui pagamentos liquidados neste período, não é possível liberar para edição' });
      }

      const token = jwt.sign({
        ColabId, periodo, ano,
      }, process.env.TOKENS_SECRET, {
        expiresIn: process.env.FREE_PERIOD_TOKEN_LIFE,
      });

      await colab.update({ PeriodToken: token });
      await FechamentoPeriodo.update({ situacao: 'Em manutenção' }, { where: { [Op.and]: [{ ano, nome: periodo }] } });

      return res.json(`O período ${periodo} de ${ano} foi liberado para o colaborador ${colab.nome} por 24Horas`);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Erro Interno do Servidor' });
    }
  }

  async delete(req, res) {
    const { ColabId } = req.params;
    const colab = await Colabs.findByPk(ColabId);

    if (!colab) {
      return res.status(500).json({ error: 'Erro interno de servidor' });
    }

    colab.update({ PeriodToken: '' });

    return res.json(`O colaborador ${colab.nome} não tem mais acesso a períodos fechados`);
  }
}

export default new PeriodoTokenController();
