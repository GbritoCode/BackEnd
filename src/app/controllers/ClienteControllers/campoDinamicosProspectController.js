import CamposDinamicosProspect from '../../models/camposDinamicosProspects';

class CampanhaController {
  async store(req, res) {
    const camposDinamicos = await CamposDinamicosProspect.create(req.body);
    return res.json(camposDinamicos);
  }

  async get(req, res) {
    const { update, id } = req.params;
    if (update === 'true') {
      const camposDinamicos = await CamposDinamicosProspect.findOne({
        where: { id },
      });
      return res.json(camposDinamicos);
    }
    const camposDinamicos = await CamposDinamicosProspect.findAll();
    return res.json(camposDinamicos);
  }

  async update(req, res) {
    const { id } = req.params;

    const camposDinamicos = await CamposDinamicosProspect.findByPk(id);
    const camposDinamicosUpdated = await camposDinamicos.update(req.body);

    return res.json(camposDinamicosUpdated);
  }

  async delete(req, res) {
    const { id } = req.params;
    const camposDinamicos = await CamposDinamicosProspect.findOne({
      where: { id },
    });
    camposDinamicos.destroy();
    return res.status(200).json(`Registro ${camposDinamicos.cod} foi deletado com Sucesso!`);
  }
}
export default new CampanhaController();
