import * as yup from 'yup';
import Segmento from '../models/segmento';
import Produto from '../models/produto';
import Area from '../models/area';
import Empresa from '../models/empresa';
import UndNeg from '../models/undNeg';

class SegmentoController {
  async store(req, res) {
    const schema = yup.object().shape({
      EmpresaId: yup.string().required(),
      UndNegId: yup.number().required(),
      ProdutoId: yup.number().required(),
      AreaId: yup.number().required(),
      descSegmt: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const {
      EmpresaId,
      UndNegId,
      ProdutoId,
      AreaId,
      descSegmt,
    } = await Segmento.create(req.body);

    return res.json({
      EmpresaId,
      UndNegId,
      ProdutoId,
      AreaId,
      descSegmt,
    });
  }

  async get(req, res) {
    if (!req.params.id) {
      const segmento = await Segmento.findAll({
        include: [{ model: UndNeg }, { model: Produto }, { model: Area }, { model: Empresa }],
      });
      return res.json(segmento);
    }
    const segmento = await Segmento.findOne({ where: { id: req.params.id } });
    return res.json(segmento);
  }

  async update(req, res) {
    const segmento = await Segmento.findByPk(req.params.id);
    const {
      EmpresaId,
      UndNegId,
      ProdutoId,
      AreaId,
      descSegmt,
    } = await segmento.update(req.body);

    return res.json({
      EmpresaId,
      UndNegId,
      ProdutoId,
      AreaId,
      descSegmt,
    });
  }
}
export default new SegmentoController();
