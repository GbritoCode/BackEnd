import * as yup from 'yup';
import CliComp from '../../models/cliente_comp';

class cliCompController {
  async store(req, res) {
    const schema = yup.object().shape({
      ClienteId: yup.string().required(),
      CondPgmtoId: yup.number().required(),
      rzSocial: yup.string().required(),
      nomeAbv: yup.string().required(),
      fantasia: yup.string().required(),
      cep: yup.string().required(),
      rua: yup.string().required(),
      numero: yup.number().required(),
      bairro: yup.string().required(),
      cidade: yup.string().required(),
      uf: yup.string().required(),
      inscMun: yup.string().required(),
      inscEst: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const {
      ClienteId,
      CondPgmtoId,
      rzSocial,
      nomeAbv,
      fantasia,
      cep,
      rua,
      numero,
      bairro,
      cidade,
      uf,
      inscMun,
      inscEst,
    } = await CliComp.create(req.body);
    return res.json({
      ClienteId,
      CondPgmtoId,
      rzSocial,
      nomeAbv,
      fantasia,
      cep,
      rua,
      numero,
      bairro,
      cidade,
      uf,
      inscMun,
      inscEst,
    });
  }

  async get(req, res) {
    if (req.params.id && req.params.update) {
      const complemento = await CliComp.findOne({
        where: { id: req.params.update },
      });
      return res.json(complemento);
    } else if (req.params.id) {
      const complemento = await CliComp.findAll({
        where: {
          ClienteId: req.params.id,
        },
      });
      return res.json(complemento);
    }
  }
  async update(req, res) {
    const cliComp = await CliComp.findByPk(req.params.id);

    const {
      ClienteId,
      CondPgmtoId,
      rzSocial,
      nomeAbv,
      fantasia,
      cep,
      rua,
      numero,
      bairro,
      cidade,
      uf,
      inscMun,
      inscEst,
    } = await cliComp.update(req.body);

    return res.json({
      ClienteId,
      CondPgmtoId,
      rzSocial,
      nomeAbv,
      fantasia,
      cep,
      rua,
      numero,
      bairro,
      cidade,
      uf,
      inscMun,
      inscEst,
    });
  }
}
export default new cliCompController();
