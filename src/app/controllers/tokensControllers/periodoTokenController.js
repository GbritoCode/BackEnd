import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import Colabs from '../../models/colab';

class PeriodoTokenController {
  async store(req, res) {
    const { ColabId, periodo } = req.body;

    const colab = await Colabs.findByPk(ColabId);

    if (!colab) {
      return res.status(500).json({ error: 'Erro interno de servidor' });
    }
    const token = jwt.sign({ ColabId, periodo }, process.env.TOKENS_SECRET, {
      expiresIn: process.env.FREE_PERIOD_TOKEN_LIFE,
    });

    const aa = await colab.update({ PeriodToken: token });

    return res.json({
      aa,
    });
  }

  async delete(req, res) {
    const { ColabId } = req.params;
    const colab = await Colabs.findByPk(ColabId);

    if (!colab) {
      return res.status(500).json({ error: 'Erro interno de servidor' });
    }

    colab.update({ PeriodToken: '' });
  }
}

export default new PeriodoTokenController();
