import * as yup from 'yup';
import { BelongsTo } from 'sequelize';
import Perfils from '../../models/perfil';
import Empresa from '../../models/empresa';
import Colab from '../../models/colab';

class PerfilController {
  async store(req, res) {
    const schema = yup.object().shape({
      EmpresaId: yup.string().required(),
      desc: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const { EmpresaId, desc } = await Perfils.create(req.body);

    return res.json({
      EmpresaId,

      desc,
    });
  }

  async get(req, res) {
    if (!req.params.id) {
      const Perfil = await Perfils.findAll({ include: { all: true, isSingleAssociation: true } });
      return res.json(Perfil);
    }
    const Perfil = await Perfils.findOne({ where: { id: req.params.id } });
    return res.json(Perfil);
  }

  async update(req, res) {
    const Perfil = await Perfils.findByPk(req.params.id);
    const { EmpresaId, desc } = await Perfil.update(req.body);

    return res.json({
      EmpresaId,

      desc,
    });
  }

  async delete(req, res) {
    const Perfil = await Perfils.findOne({
      where: { id: req.params.id },
      include: [{ model: Colab }],
    });
    if (Perfil.Colab === null) {
      Perfil.destroy();
      return res.status(200).json(`Registro ${Perfil.desc} foi deletado com Sucesso!`);
    }
    return res.status(400).json({ error: 'Você não pode Excluir esse registro pois ele tem dependências' });
  }
}
export default new PerfilController();
