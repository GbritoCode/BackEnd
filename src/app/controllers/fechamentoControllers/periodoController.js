import { getDaysInMonth } from 'date-fns';
import * as yup from 'yup';
import Empresa from '../../models/empresa';
import FechamentoPeriodo from '../../models/fechamentoPeriodos';

class FechamentoPeriodoController {
  async store(req, res) {
    if (req.query.auto === 'true' && req.query.tipo === 'mensal') {
      const year = req.body.ano;
      const valueExists = await FechamentoPeriodo.findOne({
        where: {
          dataInic: `${year}-01-01`,
        },
      });
      if (valueExists) {
        return res.status(400).json({ error: 'Esse periodo já existe' });
      }

      const lastDayMonth = getDaysInMonth(new Date(year, 1));
      await FechamentoPeriodo.bulkCreate([
        {
          ano: year, EmpresaId: 1, aberto: true, nome: 'Janeiro', dataInic: `${year}-01-01`, dataFim: `${year}-01-31`,
        },
        {
          ano: year, EmpresaId: 1, aberto: true, nome: 'Fevereiro', dataInic: `${year}-02-01`, dataFim: `${year}-02-${lastDayMonth}`,
        },
        {
          ano: year, EmpresaId: 1, aberto: true, nome: 'Março', dataInic: `${year}-03-01`, dataFim: `${year}-03-31`,
        },
        {
          ano: year, EmpresaId: 1, aberto: true, nome: 'Abril', dataInic: `${year}-04-01`, dataFim: `${year}-04-30`,
        },
        {
          ano: year, EmpresaId: 1, aberto: true, nome: 'Maio', dataInic: `${year}-05-01`, dataFim: `${year}-05-31`,
        },
        {
          ano: year, EmpresaId: 1, aberto: true, nome: 'Junho', dataInic: `${year}-06-01`, dataFim: `${year}-06-30`,
        },
        {
          ano: year, EmpresaId: 1, aberto: true, nome: 'Julho', dataInic: `${year}-07-01`, dataFim: `${year}-07-31`,
        },
        {
          ano: year, EmpresaId: 1, aberto: true, nome: 'Agosto', dataInic: `${year}-08-01`, dataFim: `${year}-08-31`,
        },
        {
          ano: year, EmpresaId: 1, aberto: true, nome: 'Setembro', dataInic: `${year}-09-01`, dataFim: `${year}-09-30`,
        },
        {
          ano: year, EmpresaId: 1, aberto: true, nome: 'Outubro', dataInic: `${year}-10-01`, dataFim: `${year}-10-31`,
        },
        {
          ano: year, EmpresaId: 1, aberto: true, nome: 'Novembro', dataInic: `${year}-11-01`, dataFim: `${year}-11-30`,
        },
        {
          ano: year, EmpresaId: 1, aberto: true, nome: 'Dezembro', dataInic: `${year}-12-01`, dataFim: `${year}-12-31`,
        },
      ], { returning: true })
        .then((result) => res.json(result));
    }
    if (!req.query.auto) {
      const schema = yup.object().shape({
        EmpresaId: yup.string().required(),
        nome: yup.string().required(),
        dataInic: yup.date().required(),
        dataFim: yup.date().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation Fails' });
      }

      const {
        EmpresaId, nome, dataInic, dataFim,
      } = await FechamentoPeriodo.create(req.body);

      return res.json({
        EmpresaId,
        nome,
        dataInic,
        dataFim,
      });
    }
  }

  async get(req, res) {
    if (!req.params.id) {
      const periodo = await FechamentoPeriodo.findAll({ include: Empresa, order: [['dataInic']] });
      for (let i = 0; i < periodo.length; i++) {
        const dataInicPeriodo = periodo[i].dataValues.dataInic.split('-');
        periodo[i].dataValues.dataInic = `${dataInicPeriodo[2]}/${dataInicPeriodo[1]}/${dataInicPeriodo[0]}`;
        const dataFimPeriodo = periodo[i].dataValues.dataFim.split('-');
        periodo[i].dataValues.dataFim = `${dataFimPeriodo[2]}/${dataFimPeriodo[1]}/${dataFimPeriodo[0]}`;
      }

      return res.json(periodo);
    }
    const periodo = await FechamentoPeriodo.findOne({ where: { id: req.params.id } });
    return res.json(periodo);
  }

  async update(req, res) {
    const colab = await FechamentoPeriodo.findByPk(req.params.id);
    const {
      EmpresaId, nome, dataInic, dataFim, aberto,
    } = await colab.update(req.body);

    return res.json({
      EmpresaId,
      nome,
      dataInic,
      dataFim,
      aberto,
    });
  }

  async delete(req, res) {
    const periodo = await FechamentoPeriodo.findOne({
      where: { id: req.params.id },
    });
    if (periodo.Segmento === null) {
      periodo.destroy();
      return res.status(200).json(`Registro ${periodo.nome} foi deletado com Sucesso!`);
    }
    return res.status(400).json({ error: 'Registro possui dependências. Exclusão não permitida' });
  }
}
export default new FechamentoPeriodoController();
