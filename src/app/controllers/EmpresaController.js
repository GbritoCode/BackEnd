import * as yup from 'yup';
import Empresa from '../models/empresa';

class EmpresaController {
  async store(req, res) {
    try {
      const schema = yup.object().shape({
        UserId: yup.number().required(),
        idFederal: yup.string().required(),
        nome: yup.string().required(),
        license: yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation Fails' });
      }

      const {
        id, UserId, idFederal, nome, license,
      } = await Empresa.create(
        req.body,
      );
      return res.json({
        id,
        UserId,
        idFederal,
        nome,
        license,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro Interno do Servidor' });
    }
  }

  async get(req, res) {
    if (!req.params.id) {
      const empresa = await Empresa.findAll({});
      return res.json(empresa);
    }
    const empresa = await Empresa.findOne({ where: { idFederal: req.params.id } });
    return res.json(empresa);
  }

  async update(req, res) {
    const empresa = await Empresa.findByPk(req.params.id);
    const {
      UserId, idFederal, nome, license,
    } = await empresa.update(req.body);

    return res.json({
      UserId,
      idFederal,
      nome,
      license,
    });
  }
}
export default new EmpresaController();
