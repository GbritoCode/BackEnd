import * as yup from 'yup';
import Cliente from '../../models/cliente';
import representantes from '../../models/representante';
import tipoComiss from '../../models/tipoComiss';
import Empresa from '../../models/empresa';

class clienteController {
  async store(req, res) {
    const schema = yup.object().shape({
      CNPJ: yup.string().required(),
      nomeAbv: yup.string().required(),
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
      RepresentanteId,
      TipoComisseId,
      EmpresaId,
    } = await Cliente.create(req.body);
    return res.json({
      id,
      CNPJ,
      nomeAbv,
      RepresentanteId,
      TipoComisseId,
      EmpresaId,
    });
  }

  async get(req, res) {
    if (!req.params.id) {
      const cliente = await Cliente.findAll({
        include: [
          { model: representantes },
          { model: tipoComiss },
          { model: Empresa },
        ],
      });
      return res.json(cliente);
    } else {
      const cliente = await Cliente.findOne({ where: { id: req.params.id } });
      return res.json(cliente);
    }
  }

  async update(req, res) {
    const cliente = await Cliente.findByPk(req.params.id);

    const {
      nomeAbv,
      RepresentanteId,
      TipoComisseId,
      prospect,
    } = await cliente.update(req.body);

    return res.json({
      nomeAbv,
      RepresentanteId,
      TipoComisseId,
      prospect,
    });
  }

  async delete(req, res){
    const cliente = await Cliente.findOne({ where: { id: req.params.id } });
    cliente.destroy()
  }
}
export default new clienteController();
