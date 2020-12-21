import * as yup from 'yup';
import { getDaysInMonth } from 'date-fns';
import { Op } from 'sequelize';
import Colab from '../../models/colab';
import Oportunidade from '../../models/oportunidade';
import Despesa from '../../models/despesas';

class DespesasController {
  async store(req, res) {
    const schema = yup.object().shape({
      OportunidadeId: yup.number().required(),
      ColabId: yup.number().required(),
      dataDespesa: yup.date().required(),
      tipoDespesa: yup.number().required(),
      valorDespesa: yup.number().required(),
      desc: yup.string().optional(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const {
      OportunidadeId,
      ColabId,
      dataDespesa,
      tipoDespesa,
      valorDespesa,
      desc,
    } = await Despesa.create(req.body);
    return res.json({
      OportunidadeId,
      ColabId,
      dataDespesa,
      tipoDespesa,
      valorDespesa,
      desc,
    });
  }

  async get(req, res) {
    if (req.query.total === 'true' && req.query.tipo === 'month' && req.params.id) {
      const [year, month] = new Date().toLocaleDateString('pt-BR').split('-');
      const lastDayMonth = getDaysInMonth(new Date(year, month - 1));
      const despesa = await Despesa.sum('valorDespesa', {
        where: {
          ColabId: req.params.id,
          dataDespesa: {
            [Op.between]: [`${year}-${month}-${1}`, `${year}-${month}-${lastDayMonth}`],
          },
        },
      });
      return res.json(despesa);
    }
    if (req.params.id && req.query.update === 'true') {
      const despesa = await Despesa.findOne({
        where: { id: req.params.id },
        include: [{ model: Oportunidade }, { model: Colab }],
      });
      return res.json(despesa);
    } if (req.params.id) {
      const despesa = await Despesa.findAll({
        where: {
          ColabId: req.params.id,
        },
        include: [{ model: Oportunidade }, { model: Colab }],
      });
      return res.json(despesa);
    }
    return res.json();
  }

  async update(req, res) {
    const despesa = await Despesa.findByPk(req.params.id);
    const {
      OportunidadeId,
      ColabId,
      dataDespesa,
      tipoDespesa,
      valorDespesa,
      desc,
    } = await despesa.update(req.body);

    return res.json({
      OportunidadeId,
      ColabId,
      dataDespesa,
      tipoDespesa,
      valorDespesa,
      desc,
    });
  }
}
export default new DespesasController();
