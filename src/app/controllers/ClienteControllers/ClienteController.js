/* eslint-disable no-nested-ternary */
import * as yup from 'yup';
import excel4node from 'excel4node';
import Cliente from '../../models/cliente';
import representantes from '../../models/representante';
import tipoComiss from '../../models/tipoComiss';
import Empresa from '../../models/empresa';
import Oportunidade from '../../models/oportunidade';
import Campanhas_Clientes from '../../models/Campanhas_Clientes';
import Campanhas from '../../models/campanhas';
import CliCont from '../../models/cliCont';
import Colab from '../../models/colab';
import FollowUps from '../../models/FollowUps';
import CliComp from '../../models/clienteComp';
import { normalizeCnpj, normalizeFone } from '../../../normalize';

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
        fone: yup.string(),
        site: yup.string(),
        erp: yup.string(),
        database: yup.string(),
        ramo: yup.string(),
        setor: yup.string(),
        qtdFuncionarios: yup.string(),
        atvPrincipal: yup.string().required(),
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

      return res.json({ message: `Cliente ${cliente.nomeAbv} criado com sucesso` });
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
            { model: CliCont },
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
          { model: CliCont },
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
      for (let i = 0; i < cliente.length; i++) {
        const created = new Date(cliente[i].dataValues.createdAt).toLocaleString().slice(0, 10);
        cliente[i].dataValues.createdAt = created;
      }
      return res.json(cliente);
    }
    if (!req.params.id) {
      const cliente = await Cliente.findAll({
        include: [
          { model: representantes },
          { model: tipoComiss },
          { model: Empresa },
          { model: Campanhas },
        ],
      });
      for (let i = 0; i < cliente.length; i++) {
        const created = new Date(cliente[i].dataValues.createdAt).toLocaleString().slice(0, 10);
        cliente[i].dataValues.createdAt = created;
      }
      return res.json(cliente);
    }
    const cliente = await Cliente.findOne({
      where: { id: req.params.id },
      include: [
        { model: CliComp },
        {
          model: Campanhas,
          include:
          [
            { model: Colab },
            {
              model: FollowUps,
              separate: true,
              order: [['createdAt', 'DESC']],
            },
          ],
        },
      ],
    });

    for (let j = 0; j < cliente.Campanhas.length; j++) {
      for (let k = 0; k < cliente.Campanhas[j].FollowUps.length; k++) {
        const dataContato = cliente.Campanhas[j].FollowUps[k].dataValues.dataContato.split('-');
        cliente.Campanhas[j].FollowUps[k].dataValues.dataContato = `${dataContato[2]}/${dataContato[1]}/${dataContato[0]}`;
      }
    }

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
    try {
      const cliente = await Cliente.findOne({
        where: { id: req.params.id },
        include: [Oportunidade, Campanhas],
      });
      if (cliente.Oportunidades.length === 0 && cliente.Campanhas.length === 0) {
        try {
          await cliente.destroy();
          return res.status(200).json(`Registro ${cliente.nomeAbv} foi deletado com Sucesso!`);
        } catch (err) {
          console.log(err);
          return res.status(400).json({ error: 'Registro possui dependências. Exclusão não permitida' });
        }
      } else {
        return res.status(400).json({ error: 'Registro possui dependências. Exclusão não permitida' });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Erro Interno de Servidor' });
    }
  }
}
export default new ClienteController();
