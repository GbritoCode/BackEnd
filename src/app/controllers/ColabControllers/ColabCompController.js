import * as yup from 'yup';
import ColabComp from '../../models/colab_comp';
import Colab from '../../models/colab';

class colabCompController {
  async store(req, res) {
    const schema = yup.object().shape({
      ColabId: yup.number().required(),
      nivel: yup.number().required(),
      tipoValor: yup.number().required(),
      valor: yup.number().required(),
      dataInic: yup.date().required(),
      dataFim: yup.date().required(),
      tipoAtend: yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const {
      ColabId,
      nivel,
      tipoValor,
      valor,
      dataInic,
      dataFim,
      tipoAtend,
    } = await ColabComp.create(req.body);
    return res.json({
      ColabId,
      nivel,
      tipoValor,
      valor,
      dataInic,
      dataFim,
      tipoAtend,
    });
  }

  async get(req, res) {
    if (req.params.id && req.params.update) {
      const complemento = await ColabComp.findOne({
        where: { id: req.params.update },
      });
      return res.json(complemento);
    } else if (req.params.id) {
      const complemento = await ColabComp.findAll({
        where: {
          ColabId: req.params.id,
        },
        include: [
          { model:Colab },
        ],
      });
      return res.json(complemento);
    }
  }
  async update(req, res) {
    const colab = await ColabComp.findByPk(req.params.id);
    const {
      ColabId,
      nivel,
      tipoValor,
      valor,
      dataInic,
      dataFim,
      tipoAtend,
    } = await colab.update(req.body);

    return res.json({
      ColabId,
      nivel,
      tipoValor,
      valor,
      dataInic,
      dataFim,
      tipoAtend,
    });
  }
}
export default new colabCompController();
