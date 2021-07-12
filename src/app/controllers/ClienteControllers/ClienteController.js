import * as yup from 'yup';
import Cliente from '../../models/cliente';
import representantes from '../../models/representante';
import tipoComiss from '../../models/tipoComiss';
import Empresa from '../../models/empresa';
import Oportunidade from '../../models/oportunidade';
import Campanhas_Clientes from '../../models/Campanhas_Clientes';
import Campanhas from '../../models/campanhas';

class ClienteController {
  async store(req, res) {
    try {
      const { body } = req;
      const schema = yup.object().shape({
        CNPJ: yup.string().required(),
        nomeAbv: yup.string().required(),
        rzSoc: yup.string().required(),
        fantasia: yup.string().optional(),
        RepresentanteId: yup.string().required(),
        TipoComisseId: yup.number(),
        EmpresaId: yup.number().required(),
      });

      if (!(await schema.isValid(body))) {
        return res.status(400).json({ error: 'Validation Fails' });
      }

      const alreadyExists = await Cliente.findOne({ where: { CNPJ: body.CNPJ } });
      if (alreadyExists) {
        return res.status(400).json({ error: 'O cliente já existe' });
      }
      const cliente = await Cliente.create(body);

      if (body.CampanhaIds) {
        for (let i = 0; i < body.CampanhaIds.length; i++) {
          await Campanhas_Clientes.create({
            ClienteId: cliente.id,
            CampanhaId: body.CampanhaIds[i],
          });
        }
      }

      return res.json(cliente);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Erro Interno do Servidor' });
    }
  }

  async get(req, res) {
    const { prospect, CampanhaId, cnpj } = req.query;
    if (cnpj) {
      const cliente = await Cliente.findOne({
        where: { CNPJ: cnpj },
      });
      return res.json(cliente);
    }
    if (prospect) {
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
    if (CampanhaId) {
      const cliente = await Cliente.findAll({
        include: [
          { model: Campanhas, where: { id: CampanhaId } },
          { model: representantes },
          { model: tipoComiss },
          { model: Empresa },
        ],
      });
      // for (let i = 0; i < cliente.length; i++) {
      //   const created = cliente[i].dataValues.createdAt.slice(9);
      //   console.log(created);
      //   const data = cliente[i].dataValues.createdAt.split('-');
      //   cliente[i].dataValues.createdAt = `${data[2]}/${data[1]}/${data[0]}`;
      // }
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
