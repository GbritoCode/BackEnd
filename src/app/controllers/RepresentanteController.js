import * as yup from 'yup';
import Representante from '../models/representante';
import tipoComiss from '../models/tipoComiss';
import Empresa from '../models/empresa';
import Cliente from '../models/cliente';
import Colab from '../models/colab';
import Perfil from '../models/perfil';

class RepresentanteController {
  async store(req, res) {
    const schema = yup.object().shape({
      EmpresaId: yup.string().required(),
      nome: yup.string().required(),
      TipoComisseId: yup.number().required(),
      vlrFixMens: yup.number().required(),
      ColabId: yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const representante = await Representante.create(req.body);
    return res.json(representante);
  }

  async get(req, res) {
    if (!req.params.id) {
      const representante = await Representante.findAll({
        include: [{ model: tipoComiss }, { model: Empresa }, {
          model: Colab, include: [{ model: Perfil }],
        }],
      });
      return res.json(representante);
    }
    const representante = await Representante.findOne({
      where: { id: req.params.id },
    });
    return res.json(representante);
  }

  async update(req, res) {
    const representante = await Representante.findByPk(req.params.id);
    const {
      EmpresaId,
      nome,
      TipoComisseId,
      vlrFixMens,
      ColabId,
    } = await representante.update(req.body);

    return res.json({
      EmpresaId,
      nome,
      TipoComisseId,
      vlrFixMens,
      ColabId,
    });
  }

  async delete(req, res) {
    const representante = await Representante.findOne({
      where: { id: req.params.id },
      include: [{ model: Cliente }],
    });
    if (representante.Cliente === null) {
      representante.destroy();
      return res.status(200).json(`Registro ${representante.nome} foi deletado com Sucesso!`);
    }
    return res.status(400).json({ error: 'Registro possui dependências. Exclusão não permitida' });
  }
}
export default new RepresentanteController();
