import Cliente from '../../models/cliente';
import Fornec from '../../models/fornec';
import MovimentoCaixa from '../../models/movimentoCaixa';
import RecDesp from '../../models/recDesp';

class MovimentoCaixaController {
  async store(req, res) {
    try {
      const { body } = req;
      console.log(body);

      const mov = await MovimentoCaixa.create(body);

      return res.json({ mov, message: 'Movimento criado com sucesso!' });
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

export default new MovimentoCaixaController();
