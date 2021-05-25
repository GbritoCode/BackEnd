import CliCont from '../../models/cliCont';
import Cliente from '../../models/cliente';
import FollowUps from '../../models/FollowUps';

class CampanhaController {
  async store(req, res) {
    const followUps = await FollowUps.create(req.body);
    return res.json(followUps);
  }

  async get(req, res) {
    try {
      const { update, id } = req.params;
      const { ClienteId } = req.query;
      if (update === 'true') {
        const followUps = await FollowUps.findOne({
          where: { id },
        });
        return res.json(followUps);
      }
      if (id && update !== 'true') {
        const followUps = await FollowUps.findAll(
          { where: { ClienteId }, include: [{ model: Cliente }, { model: CliCont }] },
        );
        return res.json(followUps);
      }
      return res.end();
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Erro interno de Servidor' });
    }
  }

  async update(req, res) {
    const { id } = req.params;

    const followUps = await FollowUps.findByPk(id);
    const followUpsUpdated = await followUps.update(req.body);

    return res.json(followUpsUpdated);
  }

  async delete(req, res) {
    const { id } = req.params;
    const followUps = await FollowUps.findOne({
      where: { id },
    });
    followUps.destroy();
    return res.status(200).json(`Registro ${followUps.cod} foi deletado com Sucesso!`);
  }
}
export default new CampanhaController();
