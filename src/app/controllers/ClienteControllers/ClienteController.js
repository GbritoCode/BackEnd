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

  async exportResume(req, res) {
    function checkPrefCont(cont) {
      switch (cont) {
        case 1:
          return 'Email';
        case 2:
          return 'Telefone';
        case 3:
          return 'Whatsapp';
        case 4:
          return 'Skype';
        default:
      }
    }
    function checkProxPasso(cont) {
      switch (cont) {
        case 1:
          return 'Retornar Contato';
        case 2:
          return 'Agendar Reunião';
        case 3:
          return 'Solicitar Orçamento';
        case 10:
          return 'Finalizar';
        default:
      }
    }
    const styleJustifyAndBorder = {
      alignment: {
        wrapText: true,
        horizontal: 'center',
      },
      border: {
        left: {
          style: 'thin',
        },
        top: {
          style: 'thin',
        },
        right: {
          style: 'thin',
        },
        bottom: {
          style: 'thin',
        },
      },
    };
    const styleAllBorder = {
      border: {
        left: {
          style: 'thin',
        },
        top: {
          style: 'thin',
        },
        right: {
          style: 'thin',
        },
        bottom: {
          style: 'thin',
        },
      },
    };
    try {
      const cliente = await Cliente.findAll({
        include: [
          { model: CliComp },
          { model: CliCont },
          { model: Campanhas, include: [{ model: FollowUps }] },
        ],
      });

      for (let i = 0; i < cliente.length; i += 1) {
        for (let j = 0; j < cliente[i].Campanhas.length; j += 1) {
          const cliId = cliente[i].dataValues.id;
          cliente[i].Campanhas[j].dataValues.FollowUps = cliente[i].Campanhas[j].FollowUps.filter((arr) => arr.ClienteId === cliId);
        }
      }

      const cliMapped = cliente.map((cli) => ({
        Cliente: {
          CNPJ: normalizeCnpj(cli.CNPJ),
          'Nome Abreviado': cli.nomeAbv,
          'Razão Social': cli.rzSoc,
          Telefone: normalizeFone(cli.fone),
          Site: cli.site,
          'Atividade Principal': cli.atvPrincipal,
          CEP: cli.CliComp.cep,
          Rua: cli.CliComp.rua,
          Numero: cli.CliComp.numero,
          Complemento: cli.CliComp.complemento,
          Bairro: cli.CliComp.bairro,
          Cidade: cli.CliComp.cidade,
          UF: cli.CliComp.uf,
          'Inscrição Munucipal': cli.CliComp.inscMun,
          'Inscrição Estadual': cli.CliComp.inscEst,
        },
        Campanhas: cli.Campanhas.map((camp) => ({
          Código: camp.cod,
          Descrição: camp.desc,
          follow: camp.FollowUps.filter((arr) => arr.ClienteId === cli.id).map((fup) => ({
            'Data Próximo Contato': fup.dataProxContato,
            'Data Contato': fup.dataContato,
            Detalhes: fup.detalhes,
            Reação: fup.reacao,
            'Próximo Passo': checkProxPasso(fup.proxPasso),
            'Preferência de Contato': checkPrefCont(fup.prefContato),
            Contato: cli.CliConts.find((a) => a.id === fup.CliContId).nome,
          })),
        })),
        Contatos: cli.CliConts.map((cont) => ({
          Nome: cont.nome,
          Cargo: cont.cargo,
          Email: cont.email,
          Celular: normalizeFone(cont.cel),
          Telefone: normalizeFone(cont.fone),
          Ramal: cont.ramal,
          Skype: cont.skype,
          Linkedin: cont.linkedin,
          Aniversário: cont.aniver,
        })),

      }));
      const workBook = new excel4node.Workbook();
      let count = 0;
      const sheet = [];
      cliMapped.forEach((el) => {
        sheet.push(workBook.addWorksheet(el.Cliente['Nome Abreviado']));
        const headingColumnNames = Object.keys(cliMapped[0].Cliente);
        const headingColumnContNames = [
          'Nome',
          'Cargo',
          'Email',
          'Celular',
          'Telefone',
          'Ramal',
          'Skype',
          'Linkedin',
          'Aniversário',
        ];
        const headingColumnCampNames = ['Código', 'Descrição'];
        const headingColumnFollowNames = [
          'Data Contato',
          'Data Próximo Contato',
          'Detalhes',
          'Reação',
          'Próximo Passo',
          'Preferência de Contato',
          'Contato',
        ];
        let headingColumnIndex = 1;

        headingColumnNames.forEach((heading) => {
          sheet[count].cell(1, headingColumnIndex++)
            .string(heading);
        });
        let rowIndex = 2;
        Object.values(cliMapped[count]).forEach((record) => {
          let columnIndex = 1;
          Object.keys(record).forEach((columnName) => {
            if (headingColumnNames.find((arr) => arr === columnName)) {
              sheet[count].cell(rowIndex, columnIndex++)
                .string(record[columnName] === null ? '' : typeof record[columnName] === 'number' ? `${record[columnName]}` : record[columnName]);
            }
          });
          rowIndex++;
        });
        // contato Cliente

        const headingRowContIndex = 4;
        let contRowIndex = headingRowContIndex + 2;
        Object.values(cliMapped[count].Contatos).forEach((record) => {
          headingColumnIndex = 1;
          sheet[count].cell(headingRowContIndex, 1, headingRowContIndex, 9, true).string('Contatos').style(styleJustifyAndBorder);
          headingColumnContNames.forEach((heading) => {
            sheet[count].cell(headingRowContIndex + 1, headingColumnIndex++)
              .string(heading).style(styleAllBorder);
          });
          let columnIndex = 1;

          Object.keys(record).forEach((columnName) => {
            sheet[count].cell(contRowIndex, columnIndex++)
              .string(record[columnName] === null ? ''
                : typeof record[columnName] === 'number' ? `${record[columnName]}`
                  : record[columnName]).style(styleAllBorder);

            headingColumnIndex = 1;
          });

          contRowIndex++;
        });

        // Campanhas
        let headingRowCampIndex = contRowIndex + 1;
        Object.values(cliMapped[count].Campanhas).forEach((record) => {
          headingColumnIndex = 1;
          sheet[count].cell(headingRowCampIndex, 1, headingRowCampIndex, 7, true).string('Campanha').style(styleJustifyAndBorder);
          headingColumnCampNames.forEach((heading) => {
            if (heading === 'Código') {
              sheet[count].cell(headingRowCampIndex + 1, headingColumnIndex, headingRowCampIndex + 1, headingColumnIndex + 2, true)
                .string(heading).style(styleJustifyAndBorder);
              headingColumnIndex += 3;
            } else if (heading === 'Descrição') {
              sheet[count].cell(headingRowCampIndex + 1, headingColumnIndex, headingRowCampIndex + 1, headingColumnIndex + 3, true)
                .string(heading).style(styleJustifyAndBorder);
            }
          });
          const CampanhaRowIndex = headingRowCampIndex + 2;
          let campColumnIndex = 1;

          Object.keys(record).forEach((columnName) => {
            if (columnName !== 'follow') {
              if (columnName === 'Código') {
                sheet[count].cell(CampanhaRowIndex, campColumnIndex, CampanhaRowIndex, campColumnIndex + 2, true)
                  .string(
                    record[columnName] === null ? ''
                      : typeof record[columnName] === 'number' ? `${record[columnName]}`
                        : record[columnName],
                  ).style(styleJustifyAndBorder);
                campColumnIndex += 3;
              } else if (columnName === 'Descrição') {
                sheet[count].cell(CampanhaRowIndex, campColumnIndex, CampanhaRowIndex, campColumnIndex + 3, true)
                  .string(
                    record[columnName] === null ? ''
                      : typeof record[columnName] === 'number' ? `${record[columnName]}`
                        : record[columnName],
                  ).style(styleJustifyAndBorder);
              }
            }
            headingColumnIndex = 1;
          });
          // CampanhaRowIndex++;
          // colocando título de Follows

          sheet[count].cell(CampanhaRowIndex + 1, 1, CampanhaRowIndex + 1, 7, true).string('FollowUps').style(styleJustifyAndBorder);
          headingColumnFollowNames.forEach((heading) => {
            sheet[count].cell(CampanhaRowIndex + 2, headingColumnIndex++)
              .string(heading).style(styleAllBorder);
          });
          let followRowIndex = CampanhaRowIndex + 3;
          let followColumnIndex = 1;
          // console.log(record.follow);
          record.follow.forEach((arr) => {
            followColumnIndex = 1;
            Object.keys(arr).forEach((columnNames) => {
              sheet[count].cell(followRowIndex, followColumnIndex++)
                .string(
                  arr[columnNames] === null ? ''
                    : typeof arr[columnNames] === 'number' ? `${arr[columnNames]}`
                      : arr[columnNames],
                ).style(styleAllBorder);
            });
            followRowIndex++;
          });
          headingRowCampIndex = followRowIndex + 2;
        });

        sheet[count].column(1).setWidth(17.63);
        sheet[count].column(2).setWidth(19);
        sheet[count].column(3).setWidth(35.75);
        sheet[count].column(4).setWidth(17.25);
        sheet[count].column(5).setWidth(17.25);
        sheet[count].column(6).setWidth(35.75);

        count += 1;
      });

      let today = JSON.stringify(new Date().toLocaleString('pt-br'));
      today = today.split('/').join('-');
      today = today.split(':').join('.');
      console.log(today);
      return workBook.write(`Relatório ${today}.xlsx`, res);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err: 'Erro Interno de Servidor' });
    }
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
