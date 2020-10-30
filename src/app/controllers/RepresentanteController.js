import * as yup from 'yup';
import Representante from '../models/representante';
import tipoComiss from '../models/tipoComiss';
import Empresa from '../models/empresa';

class representanteController {
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
    } else {
      const representante = await Representante.findOne({
        where: { id: req.params.id },
      });
      return res.json(representante);
    }
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
}
export default new representanteController();
