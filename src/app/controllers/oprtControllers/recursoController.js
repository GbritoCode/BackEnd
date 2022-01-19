import * as yup from 'yup';
import Cliente from '../../models/cliente';
import Colab from '../../models/colab';
import Notifications from '../../models/notifications';
import Oportunidade from '../../models/oportunidade';
import Recurso from '../../models/recurso';

class RecursoController {
  async store(req, res) {
    const schema = yup.object().shape({
      OportunidadeId: yup.number().required(),
      ColabId: yup.number().required(),
      tipoValor: yup.number().required(),
      tipoAtend: yup.number().required(),
      custoPrev: yup.number().required(),
      dataInclusao: yup.string().required(),
      hrsPrevst: yup.number().required(),
      colabVlrHr: yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }
    const response = await Recurso.create(req.body);

    const oport = await Oportunidade.findOne({
      where: { id: req.body.OportunidadeId },
      include: [{ model: Cliente }],
    });

    await Notifications.create({
      EmpresaId: oport.EmpresaId,
      content: `Você foi cadastrado em uma nova oportunidade,${oport.Cliente.nomeAbv} - ${oport.cod}, ${oport.desc}`,
      ColabId: req.body.ColabId,
    });

    return res.json(response);
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
    } if (req.query.total === 'true') {
      const rec = await Recurso.sum('custoPrev', {
        where: { OportunidadeId: req.params.id },
      });
      return res.json(rec);
    }
    if (req.params.id) {
      const rec = await Recurso.findAll({
        where: {
          OportunidadeId: req.params.id,
        },
        include: [{ model: Oportunidade }, { model: Colab }],
      });
      return res.json(rec);
    }
    return res.json();
  }

  async update(req, res) {
    const rec = await Recurso.findByPk(req.params.id);

    const {
      OportunidadeId,
      ColabId, tipoValor,
      tipoAtend,
      custoPrev,
      dataInclusao,
      hrsPrevst,
      colabVlrHr,
    } = await rec.update(req.body);

    return res.json({
      OportunidadeId,
      ColabId,
      tipoValor,
      tipoAtend,
      custoPrev,
      dataInclusao,
      hrsPrevst,
      colabVlrHr,
    });
  }

  async delete(req, res) {
    const rec = await Recurso.findOne({
      where: { id: req.params.id },
    });
    rec.destroy();
    return res.status(200).json(`Registro de ${rec.dataInclusao} foi deletado com Sucesso!`);
  }
}
export default new RecursoController();
