import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import Colabs from '../../models/colab';
import FechamentoPeriodo from '../../models/fechamentoPeriodos';

class PeriodoTokenController {
  async store(req, res) {
    const { ColabId, periodo, ano } = req.body;

    const colab = await Colabs.findByPk(ColabId);

    if (!colab || !periodo || !ano) {
      return res.status(500).json({ error: 'Erro interno de servidor' });
    }
    const token = jwt.sign({ ColabId, periodo, ano }, process.env.TOKENS_SECRET, {
      expiresIn: process.env.FREE_PERIOD_TOKEN_LIFE,
    });

    await colab.update({ PeriodToken: token });
    await FechamentoPeriodo.update({ situacao: 'Em manutenção' }, { where: { [Op.and]: [{ ano, nome: periodo }] } });

    return res.json(`O período ${periodo} de ${ano} foi liberado para o colaborador ${colab.nome} por 24Horas`);
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
