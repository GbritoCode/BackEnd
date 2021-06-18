import Campanha from '../../models/campanhas';
import Campanhas_Clientes from '../../models/Campanhas_Clientes';
import Cliente from '../../models/cliente';
import Colab from '../../models/colab';
import Representante from '../../models/representante';
import TipoComisse from '../../models/tipoComiss';

class CampanhaController {
  async store(req, res) {
    try {
      const { body } = req;

      const campanha = await Campanha.create(body);

      if (body.ClienteIds) {
        for (let i = 0; i < body.ClienteIds.length; i++) {
          await Campanhas_Clientes.create({
            CampanhaId: campanha.id,
            ClienteId: body.ClienteIds[i],
          });
        }
      }

      return res.json(campanha);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Erro Interno do Servidor' });
    }
  }

  async get(req, res) {
    const { update, id } = req.params;
    if (update === 'true') {
      const campanha = await Campanha.findOne({
        where: { id },
      });
      return res.json(campanha);
    }
    const campanha = await Campanha.findAll({
      include: [
        {
          model: Cliente,
          include: [
            { model: Representante }, { model: TipoComisse },
          ],
        },
        {
          model: Colab,
        },
      ],
    });
    return res.json(campanha);
  }

  async update(req, res) {
    const { id } = req.params;

    const campanha = await Campanha.findByPk(id);
    const campanhaUpdated = await campanha.update(req.body);

    return res.json(campanhaUpdated);
  }

  async delete(req, res) {
    const { removeRelation, CampanhaId } = req.query;
    const { id } = req.params;
    if (removeRelation) {
      const campanha = await Campanhas_Clientes.findOne({
        where: { ClienteId: id, CampanhaId },
      });
      campanha.destroy();
      return res.status(200).json(`Registro ${campanha.cod} foi deletado com Sucesso!`);
    }
    const campanha = await Campanha.findOne({
      where: { id },
    });
    campanha.destroy();
    return res.status(200).json(`Registro ${campanha.cod} foi deletado com Sucesso!`);
  }
}
export default new CampanhaController();
