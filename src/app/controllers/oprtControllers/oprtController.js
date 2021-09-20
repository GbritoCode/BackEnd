import * as yup from 'yup';
import Oportunidade from '../../models/oportunidade';
import Empresas from '../../models/empresa';
import Cliente from '../../models/cliente';
import UndNeg from '../../models/undNeg';
import Colab from '../../models/colab';
import Representantes from '../../models/representante';
import Segmento from '../../models/segmento';
import Recurso from '../../models/recurso';
import Area from '../../models/area';
import RecDesp from '../../models/recDesp';
import Campanhas_Clientes from '../../models/Campanhas_Clientes';

const { Op } = require('sequelize');

class OportController {
  async store(req, res) {
    try {
      const oport = await Oportunidade.create(req.body);

      console.log(oport.CampanhaId);

      if (oport.CampanhaId) {
        await Campanhas_Clientes.update({ status: 'Ativada', orcamentoSolict: new Date().toDateString() }, {
          where: { ClienteId: oport.ClienteId, CampanhaId: oport.CampanhaId },
        });
      }

      return res.json({
        data: oport,
        message: `Oportunidade ${oport.cod} criada com sucesso`,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Erro Interno do Servidor' });
    }
  }

  async get(req, res) {
    if (req.query.idOport && req.query.colab) {
      const { colab, idOport } = req.query;
      const oport = await Oportunidade.findOne({
        include: [
          { model: Recurso, where: { ColabId: colab, OportunidadeId: idOport }, required: true },
        ],
      });
      return res.json(oport);
    }
    if (req.query.apont === 'true' && req.query.colab) {
      const { colab } = req.query;
      const oport = await Oportunidade.findAll({
        where: { fase: { [Op.lt]: 5 } },
        include: [
          { model: Recurso, where: { ColabId: colab }, required: true }, { model: Cliente },
          {
            model: Segmento, include: [{ model: Area }],
          }, { model: UndNeg }, { model: RecDesp },
        ],
      });
      return res.json(oport);
    }
    if (req.query.one === 'true') {
      const oport = await Oportunidade.findAll({
        limit: 1,
        include: [{ model: Empresas }, { model: Cliente }, { model: Segmento }, { model: UndNeg }, {
          model: Colab,
        }, { model: Representantes }, { model: RecDesp }],
        order: [['createdAt', 'DESC']],
      });
      return res.json(oport);
    }
    if (req.query.data === 'true') {
      const oport = await Oportunidade.findAll({
        where: { id: req.params.id },
        include: [{ model: Recurso, required: true }],
      });
      return res.json(oport);
    } if (!req.params.id && req.query.finalizadas === 'true') {
      const oport = await Oportunidade.findAll({
        where: {
          fase: { [Op.gte]: 5 },
        },
        include: [{ model: Empresas }, { model: Cliente }, {
          model: Segmento,
        }, { model: UndNeg }, { model: Colab }, { model: Representantes }, { model: RecDesp }],
        order: [['id', 'ASC']],
      });
      for (let i = 0; i < oport.length; i++) {
        const data = oport[i].dataValues.data.split('-');
        oport[i].dataValues.data = `${data[2]}/${data[1]}/${data[0]}`;
      }
      return res.json(oport);
    } if (!req.params.id) {
      const oport = await Oportunidade.findAll({
        where: {
          fase: { [Op.lt]: 5 },
        },
        include: [{ model: Empresas }, { model: Cliente }, {
          model: Segmento,
        }, { model: UndNeg }, { model: Colab }, { model: Representantes }, { model: RecDesp }],
        order: [['id', 'ASC']],
      });
      for (let i = 0; i < oport.length; i++) {
        const data = oport[i].dataValues.data.split('-');
        oport[i].dataValues.data = `${data[2]}/${data[1]}/${data[0]}`;
      }
      return res.json(oport);
    } if (req.params.id) {
      const oport = await Oportunidade.findOne({
        where: { id: req.params.id },
        include: [{ model: Segmento }, { model: Cliente }],
      });
      return res.json(oport);
    }
    return res.json();
  }

  async update(req, res) {
    const oport = await Oportunidade.findByPk(req.params.id);
    const oportUpdated = await oport.update(req.body);

    if (oportUpdated.fase === 4 && oportUpdated.CampanhaId) {
      await Campanhas_Clientes.update({
        status: 'Alcançada',
        efetivacao: new Date().toDateString(),
      },
      {
        where: { ClienteId: oportUpdated.ClienteId, CampanhaId: oportUpdated.CampanhaId },
      });
    }

    return res.json({
      data: oportUpdated,
      message: `Oportunidade ${oportUpdated.cod} foi atualizada com sucesso`,
    });
  }
}
export default new OportController();
