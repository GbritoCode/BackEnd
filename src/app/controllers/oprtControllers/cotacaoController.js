import * as yup from 'yup';
import Cotacao from '../../models/cotacao';
import Oportunidade from '../../models/oportunidade';

class CotacaoController {
  async store(req, res) {
    const schema = yup.object().shape({
      EmpresaId: yup.number().required(),
      oportunidadeId: yup.number().required(),
      probVend: yup.number().required(),
      tipoCobranca: yup.number().required(),
      hrsPrevst: yup.number().required(),
      vlrProp: yup.number().required(),
      vlrDesc: yup.number().required(),
      vlrLiq: yup.number().required(),
      recLiq: yup.number().required(),
      prevLucro: yup.number().required(),
      numParcelas: yup.number().required(),
      motivo: yup.string().required(),
      desc: yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const {
      EmpresaId,
      oportunidadeId,
      probVend,
      tipoCobranca,
      hrsPrevst,
      vlrProp,
      vlrDesc,
      vlrLiq,
      recLiq,
      prevLucro,
      numParcelas,
      motivo,
      desc,
    } = await Cotacao.create(req.body);
    return res.json({
      EmpresaId,
      oportunidadeId,
      probVend,
      tipoCobranca,
      hrsPrevst,
      vlrProp,
      vlrDesc,
      vlrLiq,
      recLiq,
      prevLucro,
      numParcelas,
      motivo,
      desc,
    });
  }

  /*  async get(req, res) {
    sequelize
      .query('select * from cliConts where id 1', {
        type: sequelize.QueryTypes.SELECT,
      })
      .then(function(cot) {
        res.json(cot);
      });
  }
*/
  async get(req, res) {
    if (req.params.id && req.params.update) {
      const cot = await Cotacao.findOne({
        where: { id: req.params.update },
        include: [{ model: Oportunidade }],
      });
      return res.json(cot);
    } if (req.params.id === 'limit') {
      const cot = await Cotacao.findAll({
        limit: 1,
        where: {
          oportunidadeId: req.params.update,
        },
        order: [['createdAt', 'DESC']],
        include: [{ model: Oportunidade }],
      });
      return res.json(cot);
    } if (req.params.id) {
      const cot = await Cotacao.findAll({
        where: {
          oportunidadeId: req.params.id,
        },
        include: [{ model: Oportunidade }],
      });
      return res.json(cot);
    }
  }

  async update(req, res) {
    const cot = await Cotacao.findByPk(req.params.id);

    const {
      EmpresaId,
      oportunidadeId,
      probVend,
      tipoCobranca,
      hrsPrevst,
      vlrProp,
      vlrDesc,
      vlrLiq,
      recLiq,
      prevLucro,
      numParcelas,
      motivo,
      desc,
    } = await cot.update(req.body);

    return res.json({
      EmpresaId,
      oportunidadeId,
      probVend,
      tipoCobranca,
      hrsPrevst,
      vlrProp,
      vlrDesc,
      vlrLiq,
      recLiq,
      prevLucro,
      numParcelas,
      motivo,
      desc,
    });
  }
}
export default new CotacaoController();