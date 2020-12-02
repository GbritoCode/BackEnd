import * as yup from 'yup';
import Colab from '../../models/colab';
import Oportunidade from '../../models/oportunidade';
import Recurso from '../../models/recurso';

class RecurspController {
  async store(req, res) {
    const schema = yup.object().shape({
      oportunidadeId: yup.number().required(),
      colabId: yup.number().required(),
      custoPrev: yup.number().required(),
      dataInclusao: yup.date().required(),
      hrsPrevst: yup.number().required(),
      colabVlrHr: yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const {
      oportunidadeId,
      colabId,
      custoPrev,
      dataInclusao,
      hrsPrevst,
      colabVlrHr,
      recLiq,
    } = await Recurso.create(req.body);
    return res.json({
      oportunidadeId,
      colabId,
      custoPrev,
      dataInclusao,
      hrsPrevst,
      colabVlrHr,
      recLiq,
    });
  }

  /*  async get(req, res) {
    sequelize
      .query('select * from cliConts where id 1', {
        type: sequelize.QueryTypes.SELECT,
      })
      .then(function(rec) {
        res.json(rec);
      });
  }
*/
  async get(req, res) {
    if (req.params.id && req.params.update) {
      const rec = await Recurso.findOne({
        where: { id: req.params.update },
        include: [{ model: Oportunidade }, { model: Colab }],
      });
      return res.json(rec);
    } if (req.params.id) {
      const rec = await Recurso.findAll({
        where: {
          oportunidadeId: req.params.id,
        },
        include: [{ model: Oportunidade }, { model: Colab }],
      });
      return res.json(rec);
    }
  }

  async update(req, res) {
    const rec = await Recurso.findByPk(req.params.id);

    const {
      oportunidadeId,
      colabId,
      custoPrev,
      dataInclusao,
      hrsPrevst,
      colabVlrHr,
    } = await rec.update(req.body);

    return res.json({
      oportunidadeId,
      colabId,
      custoPrev,
      dataInclusao,
      hrsPrevst,
      colabVlrHr,
    });
  }
}
export default new RecurspController();
