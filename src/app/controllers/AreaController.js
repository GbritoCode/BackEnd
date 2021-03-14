import * as yup from 'yup';
import Area from '../models/area';
import Empresa from '../models/empresa';
import Segmento from '../models/segmento';

class AreaController {
  async store(req, res) {
    const schema = yup.object().shape({
      EmpresaId: yup.string().required(),
      descArea: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const { EmpresaId, descArea } = await Area.create(req.body);

    return res.json({
      EmpresaId,
      descArea,
    });
  }

  async get(req, res) {
    if (req.query.one === 'true') {
      const area = await Area.findAll({
        limit: 1,
        order: [['createdAt', 'DESC']],
      });
      return res.json(area);
    }
    if (!req.params.id) {
      const area = await Area.findAll({ include: Empresa });
      return res.json(area);
    }
    const area = await Area.findOne({ where: { id: req.params.id } });
    return res.json(area);
  }

  async update(req, res) {
    const colab = await Area.findByPk(req.params.id);
    const { EmpresaId, descArea } = await colab.update(req.body);

    return res.json({
      EmpresaId,
      descArea,
    });
  }

  async delete(req, res) {
    const area = await Area.findOne({
      where: { id: req.params.id },
      include: [{ model: Segmento }],
    });
    if (area.Segmento === null) {
      area.destroy();
      return res.status(200).json(`Registro ${area.descArea} foi deletado com Sucesso!`);
    }
    return res.status(400).json({ error: 'Registro possui dependências. Exclusão não permitida' });
  }
}
export default new AreaController();
