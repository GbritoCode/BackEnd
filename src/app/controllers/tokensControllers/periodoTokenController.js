import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import { monthFullToNumber } from '../../../generalVar';
import Colabs from '../../models/colab';
import FechamentoPeriodo from '../../models/fechamentoPeriodos';
import LiquidMovCaixa from '../../models/liquidMovCaixa';
import MovimentoCaixa from '../../models/movimentoCaixa';
import Perfil from '../../models/perfil';

class PeriodoTokenController {
  async store(req, res) {
    try {
      const { ColabId, periodo, ano } = req.body;
      let tokenPerm = {
        hrs: true,
        desp: true,
        caixa: true,
      }; let
        checkPerfil = false;

      const colab = await Colabs.findByPk(
        ColabId,
        {
          include: [Perfil],
        },
      );

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

      // eslint-disable-next-line no-restricted-syntax
      for (const pgmto of colabPgmto) {
        if (pgmto.LiquidMovCaixas.length !== 0) {
          tokenPerm = {
            caixa: true,
            hrs: false,
            desp: false,
          };
          checkPerfil = true;
        }
      }

      if (checkPerfil && colab.Perfil.permittedPages.search('Movimento Caixa tab') < 0) {
        return res.status(500).json({ error: 'O colaborador já foi pago, não é possível liberar o período' });
      }

      const token = jwt.sign({
        ColabId, periodo, ano, perms: tokenPerm,
      }, process.env.TOKENS_SECRET, {
        expiresIn: process.env.FREE_PERIOD_TOKEN_LIFE,
      });

      await colab.update({ PeriodToken: token });
      await FechamentoPeriodo.update({ situacao: 'Em manutenção' }, { where: { [Op.and]: [{ ano, nome: periodo }] } });

      console.log({
        ColabId, periodo, ano, perms: tokenPerm,
      });

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
