import * as yup from 'yup';
import perfil from '../../models/perfil.js';
import Empresa from '../../models/empresa.js';

class perfilController {
  async store(req, res) {
    const schema = yup.object().shape({
      EmpresaId: yup.string().required(),
      desc: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const { EmpresaId, desc } = await perfil.create(req.body);

    return res.json({
      EmpresaId,

      desc,
    });
  }
  async get(req, res) {
    if (!req.params.id) {
      const Perfil = await perfil.findAll({ include: Empresa });
      return res.json(Perfil);
    } else {
      const Perfil = await perfil.findOne({ where: { id: req.params.id } });
      return res.json(Perfil);
    }
  }
  async update(req, res) {
    const Perfil = await perfil.findByPk(req.params.id);
    const { EmpresaId, desc } = await Perfil.update(req.body);

    return res.json({
      EmpresaId,

      desc,
    });
  }
}
export default new perfilController();
