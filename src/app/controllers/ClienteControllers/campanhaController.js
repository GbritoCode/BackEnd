import Campanha from '../../models/campanhas';

class CampanhaController {
  async store(req, res) {
    const campanha = await Campanha.create(req.body);
    return res.json(campanha);
  }

  async get(req, res) {
    const { update, id } = req.params;
    if (update === 'true') {
      const campanha = await Campanha.findOne({
        where: { id },
      });
      return res.json(campanha);
    }
    const campanha = await Campanha.findAll();
    return res.json(campanha);
  }

  async update(req, res) {
    const { id } = req.params;

    const campanha = await Campanha.findByPk(id);
    const campanhaUpdated = await campanha.update(req.body);

    return res.json(campanhaUpdated);
  }

  async delete(req, res) {
    const { id } = req.params;
    const campanha = await Campanha.findOne({
      where: { id },
    });
    campanha.destroy();
    return res.status(200).json(`Registro ${campanha.cod} foi deletado com Sucesso!`);
  }
}
export default new CampanhaController();
