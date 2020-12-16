import * as yup from 'yup';
import Oportunidade from '../../models/oportunidade';
import Empresas from '../../models/empresa';
import Cliente from '../../models/cliente';
import UndNeg from '../../models/undNeg';
import itmControle from '../../models/itmControle';
import Colab from '../../models/colab';
import Representantes from '../../models/representante';
import Segmento from '../../models/segmento';

const { Op } = require('sequelize');

class OportController {
  async store(req, res) {
    const schema = yup.object().shape({
      EmpresaId: yup.number().required(),
      ColabId: yup.number().required(),
      ClienteId: yup.number().required(),
      UndNegId: yup.number().required(),
      ItmControleId: yup.number().required(),
      SegmentoId: yup.number().required(),
      RepresentanteId: yup.number().required(),
      contato: yup.number().required(),
      data: yup.date().required(),
      fase: yup.number().required(),
      cod: yup.string().required(),
      desc: yup.string().required(),
      narrativa: yup.string(),
      totalHoras: yup.number(),
    });

    const {
      EmpresaId,
      ColabId,
      data,
      fase,
      ClienteId,
      contato,
      cod,
      UndNegId,
      ItmControleId,
      SegmentoId,
      RepresentanteId,
      desc,
      narrativa,
      totalHoras,
    } = await Oportunidade.create(req.body);

    return res.json({
      EmpresaId,
      ColabId,
      data,
      fase,
      ClienteId,
      contato,
      cod,
      UndNegId,
      ItmControleId,
      SegmentoId,
      RepresentanteId,
      desc,
      narrativa,
      totalHoras,
    });
  }

  async get(req, res) {
    if (req.query.one === 'true') {
      const oport = await Oportunidade.findAll({
        limit: 1,
        include: [{ model: Empresas }, { model: Cliente }, { model: Segmento }, { model: UndNeg },
          { model: itmControle }, { model: Colab }, { model: Representantes }],
        order: [['createdAt', 'DESC']],
      });
      return res.json(oport);
    }
    if (!req.params.id) {
      const oport = await Oportunidade.findAll({
        where: {
          fase: { [Op.lt]: 5 },
        },
        include: [{ model: Empresas }, { model: Cliente }, { model: Segmento }, { model: UndNeg },
          { model: itmControle }, { model: Colab }, { model: Representantes }],
      });
      return res.json(oport);
    }
    const oport = await Oportunidade.findOne({ where: { id: req.params.id } });
    return res.json(oport);
  }

  async update(req, res) {
    const oport = await Oportunidade.findByPk(req.params.id);
    const {
      EmpresaId,
      ColabId,
      data,
      fase,
      ClienteId,
      contato,
      cod,
      UndNegId,
      ItmControleId,
      SegmentoId,
      RepresentanteId,
      desc,
      narrativa,
      totalHoras,
    } = await oport.update(req.body);

    return res.json({
      EmpresaId,
      ColabId,
      data,
      fase,
      ClienteId,
      contato,
      cod,
      UndNegId,
      ItmControleId,
      SegmentoId,
      RepresentanteId,
      desc,
      narrativa,
      totalHoras,
    });
  }
}
export default new OportController();
