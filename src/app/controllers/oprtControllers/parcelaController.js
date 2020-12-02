import * as yup from 'yup';
import Parcelas from '../../models/parcela';
import Oportunidade from '../../models/oportunidade';

class ParcelaController {
  async store(req, res) {
    const schema = yup.object().shape({
      oportunidadeId: yup.number().required(),
      parcela: yup.number().required(),
      vlrParcela: yup.number().required(),
      dtEmissao: yup.date().optional(),
      dtVencimento: yup.date().optional(),
      notaFiscal: yup.string().optional(),
      pedidoCliente: yup.string().optional(),
      situacao: yup.number().optional(),
      dtLiquidacao: yup.date().optional(),
      vlrPago: yup.number().optional(),
      saldo: yup.number().optional(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const {
      oportunidadeId,
      parcela,
      vlrParcela,
      dtEmissao,
      dtVencimento,
      notaFiscal,
      pedidoCliente,
      situacao,
      dtLiquidacao,
      vlrPago,
      saldo,
    } = await Parcelas.create(req.body);
    return res.json({
      oportunidadeId,
      parcela,
      vlrParcela,
      dtEmissao,
      dtVencimento,
      notaFiscal,
      pedidoCliente,
      situacao,
      dtLiquidacao,
      vlrPago,
      saldo,
    });
  }

  /*  async get(req, res) {
    sequelize
      .query('select * from cliConts where id 1', {
        type: sequelize.QueryTypes.SELECT,
      })
      .then(function(parc) {
        res.json(parc);
      });
  }
*/
  async get(req, res) {
    if (req.params.id && req.params.update) {
      const parc = await Parcelas.findOne({
        where: { id: req.params.update },
        include: [{ model: Oportunidade }],
      });
      return res.json(parc);
    }
    if (req.params.id) {
      const parc = await Parcelas.findAll({
        where: {
          oportunidadeId: req.params.id,
        },
        include: [{ model: Oportunidade }],
      });
      return res.json(parc);
    }
  }

  async update(req, res) {
    const parc = await Parcelas.findByPk(req.params.id);

    const {
      oportunidadeId,
      parcela,
      vlrParcela,
      dtEmissao,
      dtVencimento,
      notaFiscal,
      pedidoCliente,
      situacao,
      dtLiquidacao,
      vlrPago,
      saldo,
    } = await parc.update(req.body);

    return res.json({
      oportunidadeId,
      parcela,
      vlrParcela,
      dtEmissao,
      dtVencimento,
      notaFiscal,
      pedidoCliente,
      situacao,
      dtLiquidacao,
      vlrPago,
      saldo,
    });
  }
}
export default new ParcelaController();
