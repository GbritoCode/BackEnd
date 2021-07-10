import * as yup from 'yup';
import CliCont from '../../models/cliCont';

class CliContController {
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
      aniver: yup.date(),
      tipoConta: yup.string().required(),
      linkedin: yup.string().required(),
    });

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

  async get(req, res) {
    if (req.params.id && req.params.update) {
      const contato = await CliCont.findOne({
        where: { id: req.params.update },
      });
      return res.json(contato);
    } if (req.params.id) {
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

  async delete(req, res) {
    const cliCont = await CliCont.findOne({
      where: { id: req.params.id },
    });
    cliCont.destroy();
    return res.status(200).json(`Registro ${cliCont.nome} foi deletado com Sucesso!`);
  }
}
export default new CliContController();
