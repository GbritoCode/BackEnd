import * as yup from 'yup';
import Cliente from '../../models/cliente';
import representantes from '../../models/representante';
import tipoComiss from '../../models/tipoComiss';
import Empresa from '../../models/empresa';
import Oportunidade from '../../models/oportunidade';

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
    console.log('');
    try {
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
    } catch (err) {
      return res.status(400).json(err.message);
    }
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

  async delete(req, res) {
    const cliente = await Cliente.findOne({
      where: { id: req.params.id },
      include: [Oportunidade],
    });
    if (cliente.Oportunidade === null) {
      cliente.destroy();
      return res.status(200).json(`Registro ${cliente.nomeAbv} foi deletado com Sucesso!`);
    }
    return res.status(400).json({ error: 'Registro possui dependências. Exclusão não permitida' });
  }
}
export default new ClienteController();
