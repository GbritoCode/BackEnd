import Cliente from '../../models/cliente';
import Fornec from '../../models/fornec';
import LiquidMovCaixa from '../../models/liquidMovCaixa';
import MovimentoCaixa from '../../models/movimentoCaixa';
import RecDesp from '../../models/recDesp';

class LiquidMovCaixaController {
  async liquidaMov(modData) {
    try {
      const movLiquid = await LiquidMovCaixa.create({
        MovimentoCaixaId: modData.movId,
        valor: modData.valor,
        dtLiqui: modData.dtLiqui,
        recDesp: modData.recDesp,
      });
      return { status: true, movLiquid };
    } catch (err) {
      console.log(err);
      return { status: false, err };
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

  async update(req, res) {
    const { params, body } = req;
    try {
      const mov = await MovimentoCaixa.findOne({
        where: {
          id: params.id,
        },
      });

      await mov.update(body);

      return res.json(mov);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Erro Interno Do Servidor' });
    }
  }

  async liquida(req, res) {
    const { body } = req;

    try {
      for (const mov of body.movs) {

      }

      return res.json({ error: 'Erro Interno do Servidor' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Erro Interno do Servidor' });
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

export default new LiquidMovCaixaController();
