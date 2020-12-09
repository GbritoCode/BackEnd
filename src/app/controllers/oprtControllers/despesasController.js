import * as yup from 'yup';
import Colab from '../../models/colab';
import Oportunidade from '../../models/oportunidade';
import Despesa from '../../models/despesas';

class DespesasController {
  async store(req, res) {
    const schema = yup.object().shape({
      OportunidadeId: yup.number().required(),
      ColabId: yup.number().required(),
      dataDespesa: yup.date().required(),
      tipoDespesa: yup.date().required(),
      valorDespesa: yup.date().required(),
      desc: yup.date().required(),
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
    if (req.params.id && req.params.update) {
      const despesa = await Despesa.findOne({
        where: { id: req.params.update },
        include: [{ model: Oportunidade }, { model: Colab }],
      });
      return res.json(despesa);
    } if (req.params.id) {
      const despesa = await Despesa.findAll({
        where: {
          OportunidadeId: req.params.id,
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
