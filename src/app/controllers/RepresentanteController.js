import * as yup from 'yup';
import Representante from '../models/representante';
import tipoComiss from '../models/tipoComiss';
import Empresa from '../models/empresa';
import Cliente from '../models/cliente';

class RepresentanteController {
  async store(req, res) {
    const schema = yup.object().shape({
      EmpresaId: yup.string().required(),
      nome: yup.string().required(),
      TipoComisseId: yup.number().required(),
      vlrFixMens: yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const {
      EmpresaId,
      nome,
      TipoComisseId,
      vlrFixMens,
    } = await Representante.create(req.body);
    return res.json({
      EmpresaId,
      nome,
      TipoComisseId,
      vlrFixMens,
    });
  }

  async get(req, res) {
    if (!req.params.id) {
      const representante = await Representante.findAll({
        include: [{ model: tipoComiss }, { model: Empresa }],
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
    } = await representante.update(req.body);

    return res.json({
      EmpresaId,
      nome,
      TipoComisseId,
      vlrFixMens,
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
    return res.status(400).json({ error: 'Você não pode Excluir esse registro pois ele tem dependências' });
  }
}
export default new RepresentanteController();
