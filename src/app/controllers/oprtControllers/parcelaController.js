import * as yup from 'yup';
import Parcelas from '../../models/parcela';
import Oportunidade from '../../models/oportunidade';

class ParcelaController {
  async store(req, res) {
    const schema = yup.object().shape({
      OportunidadeId: yup.number().required(),
      parcela: yup.number().required(),
      vlrParcela: yup.number().required(),
      dtEmissao: yup.date(),
      dtVencimento: yup.date(),
      notaFiscal: yup.string(),
      pedidoCliente: yup.string(),
      situacao: yup.number(),
      dtLiquidacao: yup.date(),
      vlrPago: yup.number(),
      saldo: yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }
    const valueExists = await Parcelas.findOne({
      where: {
        parcela: req.body.parcela,
        OportunidadeId: req.body.OportunidadeId,
      },
    });
    if (valueExists) {
      return res.status(400).json({ error: 'Essa parcela já existe' });
    }
    const {
      OportunidadeId,
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
      OportunidadeId,
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
          OportunidadeId: req.params.id,
        },
        include: [{ model: Oportunidade }],
        order: [['parcela', 'ASC']],
      });
      for (let i = 0; i < parc.length; i++) {
        if (parc[i].dataValues.dtVencimento) {
          const parcs = parc[i].dataValues.dtVencimento.split('-');
          parc[i].dataValues.dtVencimento = `${parcs[2]}/${parcs[1]}/${parcs[0]}`;
        }
      }
      return res.json(parc);
    }
  }

  async update(req, res) {
    const parc = await Parcelas.findByPk(req.params.id);

    const {
      OportunidadeId,
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
      OportunidadeId,
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

  async delete(req, res) {
    const parc = await Parcelas.findOne({
      where: { id: req.params.id },
    });
    parc.destroy();
    return res.status(200).json(`Registro de ${parc.dtEmissao} foi deletado com Sucesso!`);
  }
}
export default new ParcelaController();
