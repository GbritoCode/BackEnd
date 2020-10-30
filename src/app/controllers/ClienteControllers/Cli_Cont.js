import * as yup from 'yup';
import CliCont from '../../models/cli_cont';

class cliContController {
  async store(req, res) {
    const schema = yup.object().shape({
      ClienteId: yup.string().required(),
      nome: yup.string().required(),
      cel: yup.string().required(),
      fone: yup.string().required(),
      skype: yup.string().required(),
      email: yup
        .string()
        .email()
        .required(),
      aniver: yup.date().required(),
      tipoConta: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const {
      ClienteId,
      nome,
      cel,
      fone,
      skype,
      email,
      aniver,
      tipoConta,
    } = await CliCont.create(req.body);
    return res.json({
      ClienteId,
      nome,
      cel,
      fone,
      skype,
      email,
      aniver,
      tipoConta,
    });
  }

  /*  async get(req, res) {
    sequelize
      .query('select * from cli_conts where id 1', {
        type: sequelize.QueryTypes.SELECT,
      })
      .then(function(cliCont) {
        res.json(cliCont);
      });
  }
*/
  async get(req, res) {
    if (req.params.id && req.params.update) {
      const contato = await CliCont.findOne({
        where: { id: req.params.update },
      });
      return res.json(contato);
    } else if (req.params.id) {
      const contato = await CliCont.findAll({
        where: {
          ClienteId: req.params.id,
        },
      });
      return res.json(contato);
    }
  }
  async update(req, res) {
    const cliCont = await CliCont.findByPk(req.params.id);

    const {
      ClienteId,
      nome,
      cel,
      fone,
      skype,
      email,
      aniver,
      tipoConta,
    } = await cliCont.update(req.body);

    return res.json({
      ClienteId,
      nome,
      cel,
      fone,
      skype,
      email,
      aniver,
      tipoConta,
    });
  }
}
export default new cliContController();
