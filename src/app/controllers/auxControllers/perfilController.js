import * as yup from 'yup';
import perfil from '../../models/perfil';
import Empresa from '../../models/empresa';

class PerfilController {
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
    }
    const Perfil = await perfil.findOne({ where: { id: req.params.id } });
    return res.json(Perfil);
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
export default new PerfilController();
