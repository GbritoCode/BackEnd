import * as yup from 'yup';
import moment from 'moment';
import { Op } from 'sequelize';
import Parcelas from '../../models/parcela';
import Oportunidade from '../../models/oportunidade';
import Cliente from '../../models/cliente';

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
    if (req.query.chartData === 'true' && req.query.tipo === 'gerencial') {
      const cli = await Cliente.findAll({
        include: [{ model: Oportunidade, attributes: ['id'], include: [{ model: Parcelas }] }],
      });

      let labelsPendente = [];
      let parcPendente = [];
      let parcPendenteCountCli = 0;
      let parcPendenteCount = 0;
      let parcPendenteValue = 0;

      let labelsAtrasada = [];
      let parcAtrasada = [];
      let parcAtrasadaCountCli = 0;
      let parcAtrasadaCount = 0;
      let parcAtrasadaValue = 0;

      let labelsAberta = [];
      let parcAberta = [];
      let parcAbertaCountCli = 0;
      let parcAbertaCount = 0;
      let parcAbertaValue = 0;
      const year = moment().year();
      const month = moment().month();
      const date = moment().date();
      const today = new Date(year, month, date);

      for (let i = 0; i < cli.length; i++) {
        parcPendenteCountCli = 0;
        parcAtrasadaCountCli = 0;
        parcAbertaCountCli = 0;
        for (let j = 0; j < cli[i].Oportunidades.length; j++) {
          for (let k = 0; k < cli[i].Oportunidades[j].Parcelas.length; k++) {
            if (cli[i].Oportunidades[j].Parcelas[k].situacao === 1) {
              labelsPendente[parcPendenteCount] = cli[i].nomeAbv.slice(0, 3);
              parcPendenteCountCli += 1;
              parcPendenteCount += 1;
              parcPendenteValue += cli[i].Oportunidades[j].Parcelas[k].vlrParcela;
            }

            if (
              moment(`${year}-${month + 1}-${date}`).isAfter(cli[i].Oportunidades[j].Parcelas[k].dtVencimento)
             && (
               cli[i].Oportunidades[j].Parcelas[k].situacao === 2
              || cli[i].Oportunidades[j].Parcelas[k].situacao === 3
             )
            ) {
              labelsAtrasada[parcAtrasadaCount] = cli[i].nomeAbv.slice(0, 3);
              parcAtrasadaCountCli += 1;
              parcAtrasadaCount += 1;
              parcAtrasadaValue += cli[i].Oportunidades[j].Parcelas[k].vlrParcela;
            } if (
              !(moment(`${year}-${month + 1}-${date}`).isAfter(cli[i].Oportunidades[j].Parcelas[k].dtVencimento))
              && (
                cli[i].Oportunidades[j].Parcelas[k].situacao === 2
                || cli[i].Oportunidades[j].Parcelas[k].situacao === 3
              )
            ) {
              labelsAberta[parcAbertaCount] = cli[i].nomeAbv.slice(0, 3);
              parcAbertaCountCli += 1;
              parcAbertaCount += 1;
              parcAbertaValue += cli[i].Oportunidades[j].Parcelas[k].vlrParcela;
            }
          }
          parcPendente[i] = parcPendenteCountCli;
          parcAtrasada[i] = parcAtrasadaCountCli;
          parcAberta[i] = parcAbertaCountCli;
        }
      }

      labelsAtrasada = labelsAtrasada.filter((el) => (el != null));
      parcAtrasada = parcAtrasada.filter((el) => (el !== 0));
      // parcAtrasada = parcAtrasada.filter((item, pos) => parcAtrasada.indexOf(item) === pos);
      labelsAtrasada = labelsAtrasada.filter((item, pos) => labelsAtrasada.indexOf(item) === pos);

      labelsAberta = labelsAberta.filter((el) => (el != null));
      parcAberta = parcAberta.filter((el) => (el !== 0));
      // parcAberta = parcAberta.filter((item, pos) => parcAberta.indexOf(item) === pos);
      labelsAberta = labelsAberta.filter((item, pos) => labelsAberta.indexOf(item) === pos);

      labelsPendente = labelsPendente.filter((el) => (el != null));
      parcPendente = parcPendente.filter((el) => (el !== 0));
      // parcPendente = parcPendente.filter((item, pos) => parcPendente.indexOf(item) === pos);
      labelsPendente = labelsPendente.filter((item, pos) => labelsPendente.indexOf(item) === pos);

      return res.json({
        labelsPendente,
        labelsAtrasada,
        labelsAberta,
        parcPendente,
        parcAtrasada,
        parcAberta,
        totalAberta: parcAbertaValue,
        totalAtrasada: parcAtrasadaValue,
        totalPendente: parcPendenteValue,
      });
    }
    if (req.query.listAll === 'true') {
      if (req.query.tipo === 'pendentes') {
        const parc = await Parcelas.findAll({
          where: {
            situacao: 1,
          },
          include: [{ model: Oportunidade, include: [{ model: Cliente }] }],
          order: [['parcela', 'ASC']],
        });
        for (let i = 0; i < parc.length; i++) {
          let createdFormat = JSON.stringify(parc[i].dataValues.createdAt).slice(1, 11);
          createdFormat = createdFormat.split('-');
          parc[i].dataValues.createdAt = `${createdFormat[2]}/${createdFormat[1]}/${createdFormat[0]}`;
        }

        return res.json(parc);
      }
      if (req.query.tipo === 'abertas') {
        const year = moment().year();
        const month = moment().month();
        const date = moment().date();
        const parc = await Parcelas.findAll({
          where: {
            [Op.and]: [{
              [Op.or]: [{ situacao: 2 }, { situacao: 3 }],
              dtVencimento: { [Op.gte]: `${year}-${month + 1}-${date}` },
            }],
          },
          include: [{ model: Oportunidade, include: [{ model: Cliente }] }],
          order: [['parcela', 'ASC']],
        });
        for (let i = 0; i < parc.length; i++) {
          if (parc[i].dataValues.dtVencimento) {
            const parcs = parc[i].dataValues.dtVencimento.split('-');
            parc[i].dataValues.dtVencimento = `${parcs[2]}/${parcs[1]}/${parcs[0]}`;

            let createdFormat = JSON.stringify(parc[i].dataValues.createdAt).slice(1, 11);
            createdFormat = createdFormat.split('-');
            parc[i].dataValues.createdAt = `${createdFormat[2]}/${createdFormat[1]}/${createdFormat[0]}`;
          }
        }
        return res.json(parc);
      }
      if (req.query.tipo === 'atrasadas') {
        const year = moment().year();
        const month = moment().month();
        const date = moment().date();
        const parc = await Parcelas.findAll({
          where: {
            [Op.and]: [{
              [Op.or]: [{ situacao: 2 }, { situacao: 3 }],
              dtVencimento: { [Op.lt]: `${year}-${month + 1}-${date}` },
            }],
          },
          include: [{ model: Oportunidade, include: [{ model: Cliente }] }],
          order: [['parcela', 'ASC']],
        });
        for (let i = 0; i < parc.length; i++) {
          if (parc[i].dataValues.dtVencimento) {
            const parcs = parc[i].dataValues.dtVencimento.split('-');
            parc[i].dataValues.dtVencimento = `${parcs[2]}/${parcs[1]}/${parcs[0]}`;

            const dataEmissao = parc[i].dataValues.dtEmissao.split('-');
            parc[i].dataValues.dtEmissao = `${dataEmissao[2]}/${dataEmissao[1]}/${dataEmissao[0]}`;

            let createdFormat = JSON.stringify(parc[i].dataValues.createdAt).slice(1, 11);
            createdFormat = createdFormat.split('-');
            parc[i].dataValues.createdAt = `${createdFormat[2]}/${createdFormat[1]}/${createdFormat[0]}`;
          }
        }
        return res.json(parc);
      }
    }
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
    return res.json();
  }

  async update(req, res) {
    const parc = await Parcelas.findByPk(req.params.id);

    if (req.body.dtEmissao > req.body.dtVencimento) {
      return res.status(400).json({ error: 'A data de vencimento não pode ser menor que a data de emissão' });
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
