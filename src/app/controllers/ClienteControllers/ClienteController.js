import * as yup from 'yup';
import Cliente from '../../models/cliente';
import representantes from '../../models/representante';
import tipoComiss from '../../models/tipoComiss';
import Empresa from '../../models/empresa';

class ClienteController {
  async store(req, res) {
    const schema = yup.object().shape({
      CNPJ: yup.string().required(),
      nomeAbv: yup.string().required(),
      rzSoc: yup.string().required(),
      fantasia: yup.string().optional(),
      RepresentanteId: yup.string().required(),
      TipoComisseId: yup.number(),
      EmpresaId: yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const {
      id,
      CNPJ,
      nomeAbv,
      rzSoc,
      fantasia,
      RepresentanteId,
      TipoComisseId,
      EmpresaId,
    } = await Cliente.create(req.body);
    return res.json({
      id,
      CNPJ,
      nomeAbv,
      rzSoc,
      fantasia,
      RepresentanteId,
      TipoComisseId,
      EmpresaId,
    });
  }

  async get(req, res) {
    if (req.query.prospect) {
      const { prospect } = req.query;
      if (prospect === 'true') {
        const cliente = await Cliente.findAll({
          where: { prospect: true },
          include: [
            { model: representantes },
            { model: tipoComiss },
            { model: Empresa },
          ],
        });
        return res.json(cliente);
      }
      const cliente = await Cliente.findAll({
        where: { prospect: false },
        include: [
          { model: representantes },
          { model: tipoComiss },
          { model: Empresa },
        ],
      });
      return res.json(cliente);
    }
    if (!req.params.id) {
      const cliente = await Cliente.findAll({
        include: [
          { model: representantes },
          { model: tipoComiss },
          { model: Empresa },
        ],
      });
      return res.json(cliente);
    }
    const cliente = await Cliente.findOne({ where: { id: req.params.id } });
    return res.json(cliente);
  }

  async update(req, res) {
    const cliente = await Cliente.findByPk(req.params.id);

    const {
      nomeAbv,
      rzSoc,
      fantasia,
      RepresentanteId,
      TipoComisseId,
      prospect,
    } = await cliente.update(req.body);

    return res.json({
      nomeAbv,
      rzSoc,
      fantasia,
      RepresentanteId,
      TipoComisseId,
      prospect,
    });
  }

  async delete(req) {
    const cliente = await Cliente.findOne({ where: { id: req.params.id } });
    cliente.destroy();
  }
}
export default new ClienteController();
