import * as yup from 'yup';
import Segmento from '../models/segmento';
import Produto from '../models/produto';
import Area from '../models/area';
import Empresa from '../models/empresa';
import UndNeg from '../models/undNeg';
import Oportunidade from '../models/oportunidade';

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
    if (req.query.idUndNeg) {
      const { idUndNeg } = req.query;
      const segmento = await Segmento.findAll({
        where: { UndNegId: idUndNeg },
        include: [{ model: UndNeg }, {
          model: Produto,
        }, { model: Area }, { model: Empresa }],
      });
      return res.json(segmento);
    }
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

  async delete(req, res) {
    const segmento = await Segmento.findOne({
      where: { id: req.params.id },
      include: [{ model: Oportunidade }],
    });
    if (segmento.Oportunidade === null) {
      segmento.destroy();
      return res.status(200).json(`Registro ${segmento.descSegmt} foi deletado com Sucesso!`);
    }
    return res.status(400).json({ error: 'Você não pode Excluir esse registro pois ele tem dependências' });
  }
}
export default new SegmentoController();
