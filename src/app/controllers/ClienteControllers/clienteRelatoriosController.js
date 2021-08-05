/* eslint-disable no-nested-ternary */
import excel4node from 'excel4node';
import { Op } from 'sequelize';
import {
  normalizeCnpj, normalizeDate, normalizeDatetime, normalizeFone,
} from '../../../normalize';
import Campanhas from '../../models/campanhas';
import CliCont from '../../models/cliCont';
import Cliente from '../../models/cliente';
import CliComp from '../../models/clienteComp';
import FollowUps from '../../models/FollowUps';
import Colab from '../../models/colab';

class ClienteRelatorioController {
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

    try {
      let cliente;
      const {
        filter, campId, inicDate, endDate, finalized,
      } = req.query;
      if (filter === 'true' && finalized === 'false') {
        cliente = await Cliente.findAll({
          include: [
            {
              model: CliComp,
            },
            {
              model: CliCont,
            },
            {
              model: Campanhas,
              where: {
                id: campId,
              },
              include: [
                {
                  model: FollowUps,
                  where: {
                    dataContato: { [Op.between]: [inicDate, endDate] },
                  },
                  include: [{ model: Colab }],
                },
              ],
            },
          ],
        });
      } else if (filter === 'true' && finalized === 'true') {
        cliente = await Cliente.findAll({
          include: [
            {
              model: CliComp,
            },
            {
              model: CliCont,
            },
            {
              model: Campanhas,
              where: {
                id: campId,
              },
              include: [
                {
                  model: FollowUps,
                  where: {
                    dataContato: { [Op.between]: [inicDate, endDate] },
                    proxPasso: 10,
                  },
                  include: [{ model: Colab }],
                },
              ],
            },
          ],
        });
      } if (filter === 'false') {
        cliente = await Cliente.findAll({
          include: [
            { model: CliComp },
            { model: CliCont },
            { model: Campanhas, include: [{ model: FollowUps, include: [{ model: Colab }] }] },
          ],
        });
      }

      for (let i = 0; i < cliente.length; i += 1) {
        for (let j = 0; j < cliente[i].Campanhas.length; j += 1) {
          const cliId = cliente[i].dataValues.id;
          cliente[i].Campanhas[j].dataValues.FollowUps = cliente[i].Campanhas[j].FollowUps.filter((arr) => arr.ClienteId === cliId);
        }
      }

      // return res.json(cliente);
      const cliMapped = cliente.map((cli) => ({
        Cliente: {
          CNPJ: normalizeCnpj(cli.CNPJ),
          'Nome Abreviado': cli.nomeAbv,
          'Razão Social': cli.rzSoc,
          Telefone: normalizeFone(cli.fone),
          Site: cli.site,
          'Atividade Principal': cli.atvPrincipal,
          Ramo: cli.ramo,
          Setor: cli.setor,
          ERP: cli.erp,
          'Banco de Dados': cli.database,
          'Quantidade de Funcionários': cli.qtdFuncionarios,
          Bairro: cli.CliComp.bairro,
          Cidade: cli.CliComp.cidade,
          UF: cli.CliComp.uf,
        },
        Campanhas: cli.Campanhas.map((camp) => ({
          Código: camp.cod,
          Descrição: camp.desc,
          'Entrada Campanha': normalizeDatetime(camp.Campanhas_Clientes.createdAt),
          Situação: camp.Campanhas_Clientes.ativo ? 'Em Prospecção' : 'Finalizado',
          follow: camp.FollowUps.filter((arr) => arr.ClienteId === cli.id).map((fup) => ({
            Colaborador: fup.Colab.nome,
            'Data Contato': normalizeDate(fup.dataContato),
            Contato: cli.CliConts.find((a) => a.id === fup.CliContId).nome,
            'Cargo Contato': cli.CliConts.find((a) => a.id === fup.CliContId).cargo,
            'Email Contato': cli.CliConts.find((a) => a.id === fup.CliContId).email,
            'Preferência de Contato': checkPrefCont(fup.prefContato),
            Reação: fup.reacao,
            'Próximo Passo': checkProxPasso(fup.proxPasso),
            'Data Próximo Contato': normalizeDate(fup.dataProxContato),
            Detalhes: fup.detalhes,
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
      const sheet = workBook.addWorksheet('Clientes');
      let camp = false;
      const headingColumnNames = Object.keys(cliMapped[0].Cliente);
      // const headingColumnContNames = [
      //   'Nome',
      //   'Cargo',
      //   'Email',
      //   'Celular',
      //   'Telefone',
      //   'Ramal',
      //   'Skype',
      //   'Linkedin',
      //   'Aniversário',
      // ];
      const headingColumnCampNames = ['Código', 'Descrição', 'Entrada Campanha', 'Situação'];
      const headingColumnFollowNames = [
        'Colaborador',
        'Data Contato',
        'Contato',
        'Cargo Contato',
        'Email Contato',
        'Preferência de Contato',
        'Reação',
        'Próximo Passo',
        'Data Próximo Contato',
        'Detalhes',
      ];

      // Write Column Title in Excel file
      let headingColumnIndex = 1;
      let titleColumnIndex = 1;
      sheet.cell(1, titleColumnIndex, 1, headingColumnNames.length, true).string('Cliente').style(styleJustifyAndBorder);
      titleColumnIndex += (headingColumnNames.length);
      sheet.cell(1, titleColumnIndex, 1, titleColumnIndex + headingColumnCampNames.length - 1, true).string('Campanha').style(styleJustifyAndBorder);
      titleColumnIndex += (headingColumnCampNames.length);
      sheet.cell(1, titleColumnIndex, 1, titleColumnIndex + headingColumnFollowNames.length - 1, true).string('Follows').style(styleJustifyAndBorder);

      headingColumnNames.forEach((heading) => {
        sheet.cell(2, headingColumnIndex++)
          .string(heading);
      });
      headingColumnCampNames.forEach((heading) => {
        sheet.cell(2, headingColumnIndex++)
          .string(heading);
      });
      headingColumnFollowNames.forEach((heading) => {
        sheet.cell(2, headingColumnIndex++)
          .string(heading);
      });
      // return res.json(cliMapped);
      let rowIndex = 3;
      cliMapped.forEach((el) => {
        // Write Data in Excel file
        camp = false;
        let countRowFollowAux = 0;
        if (el.Campanhas['0'].follow.length === 0) {
          Object.values(el).forEach((recordCli) => {
            let columnIndex = 1;
            Object.keys(recordCli).forEach((columnNameCli) => {
              let countRowFollow = 0;
              Object.values(el.Campanhas).forEach((recordCamp) => {
                if (headingColumnNames.find((arr) => arr === columnNameCli)) {
                  sheet.cell(rowIndex, columnIndex)
                    .string(recordCli[columnNameCli] === null ? ''
                      : typeof recordCli[columnNameCli] === 'number' ? `${recordCli[columnNameCli]}`
                        : recordCli[columnNameCli]);
                  if (columnNameCli === 'UF') {
                    camp = true;
                  }
                }
                let count = 0;
                Object.keys(recordCamp).forEach((columnNameCamp) => {
                  if (camp) {
                    if (columnIndex >= 14) {
                      if (columnNameCamp !== 'follow') {
                        sheet.cell(rowIndex, columnIndex + 1)
                          .string(
                            recordCamp[columnNameCamp] === null ? ''
                              : typeof recordCamp[columnNameCamp] === 'number' ? `${recordCamp[columnNameCamp]}`
                                : recordCamp[columnNameCamp],
                          );
                        columnIndex++;
                        count++;
                      }
                    }
                  }
                });
                columnIndex -= count;
                rowIndex++;
                countRowFollow++;
              });
              countRowFollowAux = countRowFollow;
              rowIndex -= (countRowFollow);
              columnIndex++;
            });
          });
        } else {
          Object.values(el).forEach((recordCli) => {
            let columnIndex = 1;
            Object.keys(recordCli).forEach((columnNameCli) => {
              let countRowFollow = 0;
              Object.values(el.Campanhas).forEach((recordCamp) => {
                Object.values(recordCamp.follow).forEach((recordFollow) => {
                  if (headingColumnNames.find((arr) => arr === columnNameCli)) {
                    sheet.cell(rowIndex, columnIndex)
                      .string(recordCli[columnNameCli] === null ? ''
                        : typeof recordCli[columnNameCli] === 'number' ? `${recordCli[columnNameCli]}`
                          : recordCli[columnNameCli]);
                    if (columnNameCli === 'UF') {
                      camp = true;
                    }
                  }
                  let count = 0;
                  Object.keys(recordCamp).forEach((columnNameCamp) => {
                    if (camp) {
                      if (columnIndex >= 14) {
                        if (columnNameCamp !== 'follow') {
                          sheet.cell(rowIndex, columnIndex + 1)
                            .string(
                              recordCamp[columnNameCamp] === null ? ''
                                : typeof recordCamp[columnNameCamp] === 'number' ? `${recordCamp[columnNameCamp]}`
                                  : recordCamp[columnNameCamp],
                            );
                          columnIndex++;
                          count++;
                        }
                      }
                    }
                  });
                  Object.keys(recordFollow).forEach((columnNamesFollow) => {
                    if (columnIndex >= 18) {
                      sheet.cell(rowIndex, columnIndex + 1)
                        .string(
                          recordFollow[columnNamesFollow] === null ? ''
                            : typeof recordFollow[columnNamesFollow] === 'number' ? `${recordFollow[columnNamesFollow]}`
                              : recordFollow[columnNamesFollow],
                        );
                      columnIndex++;
                      count++;
                    }
                  });
                  columnIndex -= count;

                  rowIndex++;
                  countRowFollow++;
                });
              });
              countRowFollowAux = countRowFollow;
              rowIndex -= (countRowFollow);
              columnIndex++;
            });
          });
        }
        rowIndex += countRowFollowAux;
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

  // async exportResume(req, res) {
  //   function checkPrefCont(cont) {
  //     switch (cont) {
  //       case 1:
  //         return 'Email';
  //       case 2:
  //         return 'Telefone';
  //       case 3:
  //         return 'Whatsapp';
  //       case 4:
  //         return 'Skype';
  //       default:
  //     }
  //   }
  //   function checkProxPasso(cont) {
  //     switch (cont) {
  //       case 1:
  //         return 'Retornar Contato';
  //       case 2:
  //         return 'Agendar Reunião';
  //       case 3:
  //         return 'Solicitar Orçamento';
  //       case 10:
  //         return 'Finalizar';
  //       default:
  //     }
  //   }
  //   const styleJustifyAndBorder = {
  //     alignment: {
  //       wrapText: true,
  //       horizontal: 'center',
  //     },
  //     border: {
  //       left: {
  //         style: 'thin',
  //       },
  //       top: {
  //         style: 'thin',
  //       },
  //       right: {
  //         style: 'thin',
  //       },
  //       bottom: {
  //         style: 'thin',
  //       },
  //     },
  //   };
  //   const styleAllBorder = {
  //     border: {
  //       left: {
  //         style: 'thin',
  //       },
  //       top: {
  //         style: 'thin',
  //       },
  //       right: {
  //         style: 'thin',
  //       },
  //       bottom: {
  //         style: 'thin',
  //       },
  //     },
  //   };
  //   try {
  //     const cliente = await Cliente.findAll({
  //       include: [
  //         { model: CliComp },
  //         { model: CliCont },
  //         { model: Campanhas, include: [{ model: FollowUps }] },
  //       ],
  //     });

  //     for (let i = 0; i < cliente.length; i += 1) {
  //       for (let j = 0; j < cliente[i].Campanhas.length; j += 1) {
  //         const cliId = cliente[i].dataValues.id;
  //         cliente[i].Campanhas[j].dataValues.FollowUps = cliente[i].Campanhas[j].FollowUps.filter((arr) => arr.ClienteId === cliId);
  //       }
  //     }

  //     const cliMapped = cliente.map((cli) => ({
  //       Cliente: {
  //         CNPJ: normalizeCnpj(cli.CNPJ),
  //         'Nome Abreviado': cli.nomeAbv,
  //         'Razão Social': cli.rzSoc,
  //         Telefone: normalizeFone(cli.fone),
  //         Site: cli.site,
  //         'Atividade Principal': cli.atvPrincipal,
  //         CEP: cli.CliComp.cep,
  //         Rua: cli.CliComp.rua,
  //         Numero: cli.CliComp.numero,
  //         Complemento: cli.CliComp.complemento,
  //         Bairro: cli.CliComp.bairro,
  //         Cidade: cli.CliComp.cidade,
  //         UF: cli.CliComp.uf,
  //         'Inscrição Munucipal': cli.CliComp.inscMun,
  //         'Inscrição Estadual': cli.CliComp.inscEst,
  //       },
  //       Campanhas: cli.Campanhas.map((camp) => ({
  //         Código: camp.cod,
  //         Descrição: camp.desc,
  //         follow: camp.FollowUps.filter((arr) => arr.ClienteId === cli.id).map((fup) => ({
  //           'Data Próximo Contato': fup.dataProxContato,
  //           'Data Contato': fup.dataContato,
  //           Detalhes: fup.detalhes,
  //           Reação: fup.reacao,
  //           'Próximo Passo': checkProxPasso(fup.proxPasso),
  //           'Preferência de Contato': checkPrefCont(fup.prefContato),
  //           Contato: cli.CliConts.find((a) => a.id === fup.CliContId).nome,
  //         })),
  //       })),
  //       Contatos: cli.CliConts.map((cont) => ({
  //         Nome: cont.nome,
  //         Cargo: cont.cargo,
  //         Email: cont.email,
  //         Celular: normalizeFone(cont.cel),
  //         Telefone: normalizeFone(cont.fone),
  //         Ramal: cont.ramal,
  //         Skype: cont.skype,
  //         Linkedin: cont.linkedin,
  //         Aniversário: cont.aniver,
  //       })),

  //     }));
  //     const workBook = new excel4node.Workbook();
  //     let count = 0;
  //     const sheet = [];
  //     cliMapped.forEach((el) => {
  //       sheet.push(workBook.addWorksheet(el.Cliente['Nome Abreviado']));
  //       const headingColumnNames = Object.keys(cliMapped[0].Cliente);
  //       const headingColumnContNames = [
  //         'Nome',
  //         'Cargo',
  //         'Email',
  //         'Celular',
  //         'Telefone',
  //         'Ramal',
  //         'Skype',
  //         'Linkedin',
  //         'Aniversário',
  //       ];
  //       const headingColumnCampNames = ['Código', 'Descrição'];
  //       const headingColumnFollowNames = [
  //         'Data Contato',
  //         'Data Próximo Contato',
  //         'Detalhes',
  //         'Reação',
  //         'Próximo Passo',
  //         'Preferência de Contato',
  //         'Contato',
  //       ];
  //       let headingColumnIndex = 1;

  //       headingColumnNames.forEach((heading) => {
  //         sheet[count].cell(1, headingColumnIndex++)
  //           .string(heading);
  //       });
  //       let rowIndex = 2;
  //       Object.values(cliMapped[count]).forEach((record) => {
  //         let columnIndex = 1;
  //         Object.keys(record).forEach((columnName) => {
  //           if (headingColumnNames.find((arr) => arr === columnName)) {
  //             sheet[count].cell(rowIndex, columnIndex++)
  //               .string(record[columnName] === null ? '' : typeof record[columnName] === 'number' ? `${record[columnName]}` : record[columnName]);
  //           }
  //         });
  //         rowIndex++;
  //       });
  //       // contato Cliente

  //       const headingRowContIndex = 4;
  //       let contRowIndex = headingRowContIndex + 2;
  //       Object.values(cliMapped[count].Contatos).forEach((record) => {
  //         headingColumnIndex = 1;
  //         sheet[count].cell(headingRowContIndex, 1, headingRowContIndex, 9, true).string('Contatos').style(styleJustifyAndBorder);
  //         headingColumnContNames.forEach((heading) => {
  //           sheet[count].cell(headingRowContIndex + 1, headingColumnIndex++)
  //             .string(heading).style(styleAllBorder);
  //         });
  //         let columnIndex = 1;

  //         Object.keys(record).forEach((columnName) => {
  //           sheet[count].cell(contRowIndex, columnIndex++)
  //             .string(record[columnName] === null ? ''
  //               : typeof record[columnName] === 'number' ? `${record[columnName]}`
  //                 : record[columnName]).style(styleAllBorder);

  //           headingColumnIndex = 1;
  //         });

  //         contRowIndex++;
  //       });

  //       // Campanhas
  //       let headingRowCampIndex = contRowIndex + 1;
  //       Object.values(cliMapped[count].Campanhas).forEach((record) => {
  //         headingColumnIndex = 1;
  //         sheet[count].cell(headingRowCampIndex, 1, headingRowCampIndex, 7, true).string('Campanha').style(styleJustifyAndBorder);
  //         headingColumnCampNames.forEach((heading) => {
  //           if (heading === 'Código') {
  //             sheet[count].cell(headingRowCampIndex + 1, headingColumnIndex, headingRowCampIndex + 1, headingColumnIndex + 2, true)
  //               .string(heading).style(styleJustifyAndBorder);
  //             headingColumnIndex += 3;
  //           } else if (heading === 'Descrição') {
  //             sheet[count].cell(headingRowCampIndex + 1, headingColumnIndex, headingRowCampIndex + 1, headingColumnIndex + 3, true)
  //               .string(heading).style(styleJustifyAndBorder);
  //           }
  //         });
  //         const CampanhaRowIndex = headingRowCampIndex + 2;
  //         let campColumnIndex = 1;

  //         Object.keys(record).forEach((columnName) => {
  //           if (columnName !== 'follow') {
  //             if (columnName === 'Código') {
  //               sheet[count].cell(CampanhaRowIndex, campColumnIndex, CampanhaRowIndex, campColumnIndex + 2, true)
  //                 .string(
  //                   record[columnName] === null ? ''
  //                     : typeof record[columnName] === 'number' ? `${record[columnName]}`
  //                       : record[columnName],
  //                 ).style(styleJustifyAndBorder);
  //               campColumnIndex += 3;
  //             } else if (columnName === 'Descrição') {
  //               sheet[count].cell(CampanhaRowIndex, campColumnIndex, CampanhaRowIndex, campColumnIndex + 3, true)
  //                 .string(
  //                   record[columnName] === null ? ''
  //                     : typeof record[columnName] === 'number' ? `${record[columnName]}`
  //                       : record[columnName],
  //                 ).style(styleJustifyAndBorder);
  //             }
  //           }
  //           headingColumnIndex = 1;
  //         });
  //         // CampanhaRowIndex++;
  //         // colocando título de Follows

  //         sheet[count].cell(CampanhaRowIndex + 1, 1, CampanhaRowIndex + 1, 7, true).string('FollowUps').style(styleJustifyAndBorder);
  //         headingColumnFollowNames.forEach((heading) => {
  //           sheet[count].cell(CampanhaRowIndex + 2, headingColumnIndex++)
  //             .string(heading).style(styleAllBorder);
  //         });
  //         let followRowIndex = CampanhaRowIndex + 3;
  //         let followColumnIndex = 1;
  //         // console.log(record.follow);
  //         record.follow.forEach((arr) => {
  //           followColumnIndex = 1;
  //           Object.keys(arr).forEach((columnNames) => {
  //             sheet[count].cell(followRowIndex, followColumnIndex++)
  //               .string(
  //                 arr[columnNames] === null ? ''
  //                   : typeof arr[columnNames] === 'number' ? `${arr[columnNames]}`
  //                     : arr[columnNames],
  //               ).style(styleAllBorder);
  //           });
  //           followRowIndex++;
  //         });
  //         headingRowCampIndex = followRowIndex + 2;
  //       });

  //       sheet[count].column(1).setWidth(17.63);
  //       sheet[count].column(2).setWidth(19);
  //       sheet[count].column(3).setWidth(35.75);
  //       sheet[count].column(4).setWidth(17.25);
  //       sheet[count].column(5).setWidth(17.25);
  //       sheet[count].column(6).setWidth(35.75);

  //       count += 1;
  //     });

  //     let today = JSON.stringify(new Date().toLocaleString('pt-br'));
  //     today = today.split('/').join('-');
  //     today = today.split(':').join('.');
  //     console.log(today);
  //     return workBook.write(`Relatório ${today}.xlsx`, res);
  //   } catch (err) {
  //     console.log(err);
  //     return res.status(500).json({ err: 'Erro Interno de Servidor' });
  //   }
  // }
}

export default new ClienteRelatorioController();
