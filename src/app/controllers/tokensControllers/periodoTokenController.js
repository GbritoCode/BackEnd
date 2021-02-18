import jwt from 'jsonwebtoken';
import Colabs from '../../models/colab';

class PeriodoTokenController {
  async store(req, res) {
    const { ColabId, periodo } = req.body;

    const colab = await Colabs.findByPk(ColabId);

    if (!colab || !periodo) {
      return res.status(500).json({ error: 'Erro interno de servidor' });
    }
    const token = jwt.sign({ ColabId, periodo }, process.env.TOKENS_SECRET, {
      expiresIn: process.env.FREE_PERIOD_TOKEN_LIFE,
    });

    const aa = await colab.update({ PeriodToken: token });
    return res.json(`O período ${periodo} foi liberado para o colaborador ${aa.nome} por 24Horas`);
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
