// --------------------RECURSO----------------------
// --------------------RECURSO----------------------
// --------------------RECURSO----------------------
// try {
//   const rec = await Recurso.findAll({
//     attributes: ['id', 'colabVlrHr', 'custoPrev'],
//   });

//   // eslint-disable-next-line no-restricted-syntax
//   for (const recurso of rec) {
//     const { id, colabVlrHr, custoPrev } = recurso.dataValues;
//     console.log(id);
//     console.log(colabVlrHr);
//     await Recurso.update({
//       colabVlrHr: colabVlrHr / 100,
//       custoPrev: custoPrev / 100,
//     }, {
//       where: { id },
//     });
//   }

//   console.log(rec);
//   return res.json(rec);
// } catch (err) {
//   console.log(err);
//   return res.json('erro');
// }

// ////////////////////////RECURSO////////////////////////////
// ////////////////////////RECURSO////////////////////////////
// ////////////////////////RECURSO////////////////////////////

/// funções de criaçao de dados para atualização do dia 18/01/2022
// routes.get('/', async (req, res) => {
//   console.log('ok');

//   try {
//     const rec = await Recurso.findAll({
//       attributes: ['id', 'colabVlrHr', 'custoPrev'],
//     });

//     // eslint-disable-next-line no-restricted-syntax
//     for (const recurso of rec) {
//       const { id, colabVlrHr, custoPrev } = recurso.dataValues;
//       console.log(id);
//       console.log(colabVlrHr);
//       await Recurso.update({
//         colabVlrHrAux: colabVlrHr / 100,
//         custoPrevAux: custoPrev / 100,
//       }, {
//         where: { id },
//       });
//     }

//     return res.json(rec);
//   } catch (err) {
//     console.log(err);
//     return res.json('erro');
//   }

//   return res.json('ok');
// });

// routes.get('/2', async (req, res) => {
//   console.log('ok');

//   try {
//     const rec = await Recurso.findAll({
//       attributes: ['id', 'colabVlrHrAux', 'custoPrevAux'],
//     });

//     // eslint-disable-next-line no-restricted-syntax
//     for (const recurso of rec) {
//       const { id, colabVlrHrAux, custoPrevAux } = recurso.dataValues;

//       await Recurso.update({
//         colabVlrHr: colabVlrHrAux,
//         custoPrev: custoPrevAux,
//       }, {
//         where: { id },
//       });
//     }

//     return res.json(rec);
//   } catch (err) {
//     console.log(err);
//     return res.json('erro');
//   }

//   return res.json('ok');
// });

// routes.get('/cliSigla', async (req, res) => {
//   try {
//     const cli = await Cliente.findAll({
//       attributes: ['id', 'nomeAbv'],
//     });

//     // eslint-disable-next-line no-restricted-syntax
//     for (const cliente of cli) {
//       const { id, nomeAbv } = cliente.dataValues;
//       console.log(nomeAbv);

//       if (nomeAbv === 'BRASCABOS01') {
//         await Cliente.update({
//           sigla: 'BCB',
//         }, {
//           where: { id },
//         });
//       } else if (nomeAbv === 'BRASIMPAR01') {
//         await Cliente.update({
//           sigla: 'BSP',
//         }, {
//           where: { id },
//         });
//       } else if (nomeAbv === 'BRASSUCO01') {
//         await Cliente.update({
//           sigla: 'BSC',
//         }, {
//           where: { id },
//         });
//       } else if (nomeAbv === 'MANSER01') {
//         await Cliente.update({
//           sigla: 'MSR',
//         }, {
//           where: { id },
//         });
//       } else if (nomeAbv === 'MANTIQ01') {
//         await Cliente.update({
//           sigla: 'MTQ',
//         }, {
//           where: { id },
//         });
//       } else if (nomeAbv === 'TECBAN001') {
//         await Cliente.update({
//           sigla: 'TCB',
//         }, {
//           where: { id },
//         });
//       } else if (nomeAbv === 'TECNOVAL01') {
//         await Cliente.update({
//           sigla: 'TCN',
//         }, {
//           where: { id },
//         });
//       } else if (nomeAbv === 'UNIBRAS01') {
//         await Cliente.update({
//           sigla: 'UBR',
//         }, {
//           where: { id },
//         });
//       } else if (nomeAbv === 'UNIME-PINDA01') {
//         await Cliente.update({
//           sigla: 'UMP',
//         }, {
//           where: { id },
//         });
//       } else if (nomeAbv === 'UNIMEDS.ROQUE01') {
//         await Cliente.update({
//           sigla: 'UMR',
//         }, {
//           where: { id },
//         });
//       } else if (nomeAbv === 'UNIMED-FESP01') {
//         await Cliente.update({
//           sigla: 'UMF',
//         }, {
//           where: { id },
//         });
//       } else if (nomeAbv === 'UNIPAR01') {
//         await Cliente.update({
//           sigla: 'UPR',
//         }, {
//           where: { id },
//         });
//       } else if (nomeAbv === 'CRENLO01') {
//         await Cliente.update({
//           sigla: 'CRL',
//         }, {
//           where: { id },
//         });
//       } else if (nomeAbv === 'CREFISA001') {
//         await Cliente.update({
//           sigla: 'CFS',
//         }, {
//           where: { id },
//         });
//       } else if (nomeAbv === 'PARAISO001') {
//         await Cliente.update({
//           sigla: 'PRS',
//         }, {
//           where: { id },
//         });
//       } else if (nomeAbv === 'PARLA01') {
//         await Cliente.update({
//           sigla: 'PRL',
//         }, {
//           where: { id },
//         });
//       } else if (nomeAbv === 'ELGIN001') {
//         await Cliente.update({
//           sigla: 'ELN',
//         }, {
//           where: { id },
//         });
//       } else if (nomeAbv === 'ELGIN002') {
//         await Cliente.update({
//           sigla: 'ELG',
//         }, {
//           where: { id },
//         });
//       } else {
//         const sig = nomeAbv.slice(0, 3);
//         await Cliente.update({
//           sigla: sig,
//         }, {
//           where: { id },
//         });
//       }
//     }

//     return res.json(cli);
//   } catch (err) {
//     console.log(err);
//     return res.json('erro');
//   }
//   return res.json('ok');
// });

// routes.get('/parcToMvCx_aberta', async (req, res) => {
//   try {
//     const parcelas = await Parcela.findAll(
//       {
//         where: {
//           situacao: 2,
//         },
//         include: [Oportunidade],
//       },
//     );

//     // eslint-disable-next-line no-restricted-syntax
//     for (const parc of parcelas) {
//       await MovimentoCaixa.create({
//         EmpresaId: parc.Oportunidade.EmpresaId,
//         RecDespId: parc.Oportunidade.RecDespId,
//         ColabCreate: 1,
//         ClienteId: parc.Oportunidade.ClienteId,
//         ParcelaId: parc.id,
//         status: parc.situacao - 1,
//         valor: parc.vlrParcela / 100,
//         saldo: parc.vlrParcela / 100,
//         recDesp: 'Rec',
//         dtVenc: parc.dtVencimento,
//         dtLiqui: parc.dtLiquidacao,
//         periodo: parc.dtEmissao.split('-')[1],
//         ano: parc.dtEmissao.split('-')[0],
//       });
//     }
//     console.log(parcelas.length, 'parcelas');

//     return res.json(parcelas);
//   } catch (err) {
//     console.log(err);
//     return res.json('erro');
//   }
//   return res.json('ok');
// });

// routes.get('/parcToMvCx_liquidada', async (req, res) => {
//   try {
//     const parcelas = await Parcela.findAll(
//       {
//         where: {
//           dtLiquidacao: { [Op.gte]: '01-01-2022' },
//         },
//         include: [Oportunidade],
//       },
//     );

//     // eslint-disable-next-line no-restricted-syntax
//     for (const parc of parcelas) {
//       await MovimentoCaixa.create({
//         EmpresaId: parc.Oportunidade.EmpresaId,
//         RecDespId: parc.Oportunidade.RecDespId,
//         ColabCreate: 1,
//         ClienteId: parc.Oportunidade.ClienteId,
//         ParcelaId: parc.id,
//         status: parc.situacao - 1,
//         valor: parc.vlrParcela / 100,
//         saldo: 0,
//         recDesp: 'Rec',
//         dtVenc: parc.dtVencimento,
//         dtLiqui: parc.dtLiquidacao,
//         periodo: parc.dtEmissao.split('-')[1],
//         ano: parc.dtEmissao.split('-')[0],
//       });
//     }
//     console.log(parcelas.length, 'parcelas');

//     return res.json(parcelas);
//   } catch (err) {
//     console.log(err);
//     return res.json('erro');
//   }
//   return res.json('ok');
// });

// routes.get('/liquidMvCx', async (req, res) => {
//   try {
//     const movimentos = await MovimentoCaixa.findAll();
//     let len = 0;
//     // eslint-disable-next-line no-restricted-syntax
//     for (const mv of movimentos) {
//       if (mv.status === 3) {
//         len += 1;
//         await LiquidMovCaixa.create({
//           MovimentoCaixaId: mv.id,
//           valor: mv.valor,
//           dtLiqui: mv.dtLiqui,
//           recDesp: mv.recDesp,
//         });
//       }
//       console.log(len, 'movimentos');
//     }

//     return res.json(movimentos);
//   } catch (err) {
//     console.log(err);
//     return res.json('erro');
//   }
//   return res.json('ok');
// });

// routes.get('/updateDesp', async (req, res) => {
//   try {
//     const despesas = await Despesas.findAll();
//     const relateDesp = {
//       1: 12,
//       2: 13,
//       3: 15,
//       4: 30,
//       5: 14,
//       6: 29,
//     };
//     // eslint-disable-next-line no-restricted-syntax
//     for (const desp of despesas) {
//       await Despesas.update({
//         RecDespId: relateDesp[desp.tipoDespesa],
//       }, { where: { id: desp.id } });
//     }

//     return res.json(despesas);
//   } catch (err) {
//     console.log(err);
//     return res.json('erro');
//   }
//   return res.json('ok');
// });

// routes.get('/compareValues', async (req, res) => {
//   try {
//     const parcelas_1 = await Parcela.findAll(
//       {
//         where: {
//           situacao: 2,
//         },
//         include: [Oportunidade],
//       },
//     );
//     let somaParcLiqui = 0; let somaParc = 0; let somaMv = 0; let somaMvLiqui = 0;

//     const parcelas = await Parcela.findAll(
//       {
//         where: {
//           dtLiquidacao: { [Op.gte]: '01-01-2022' },
//         },
//         include: [Oportunidade],
//       },
//     );

//     // eslint-disable-next-line no-restricted-syntax
//     for (const parc1 of parcelas_1) {
//       somaParc += parc1.vlrParcela;
//     }

//     for (const parc of parcelas) {
//       somaParcLiqui += parc.vlrParcela;
//     }

//     const movimentos = await MovimentoCaixa.findAll();
//     for (const mv of movimentos) {
//       if (mv.status === 3) {
//         somaMvLiqui += mv.valor;
//       }
//       somaMv += mv.valor;
//     }
//     somaParc /= 100;
//     somaParcLiqui /= 100;

//     return res.json({
//       somaParc, somaParcLiqui, somaMv, somaMvLiqui,
//     });
//   } catch (err) {
//     console.log(err);
//     return res.json('erro');
//   }
//   return res.json('ok');
// });

// routes.get('/parcToMvCx_p40', async (req, res) => {
//   try {
//     const parcelas = await Parcela.findAll(
//       {
//         where: {
//           id: 40,
//         },
//         include: [Oportunidade],
//       },
//     );

//     // eslint-disable-next-line no-restricted-syntax
//     for (const parc of parcelas) {
//       await MovimentoCaixa.create({
//         EmpresaId: parc.Oportunidade.EmpresaId,
//         RecDespId: parc.Oportunidade.RecDespId,
//         ColabCreate: 1,
//         ClienteId: parc.Oportunidade.ClienteId,
//         ParcelaId: parc.id,
//         status: 1,
//         valor: parc.saldo / 100,
//         saldo: parc.saldo / 100,
//         recDesp: 'Rec',
//         dtVenc: parc.dtVencimento,
//         periodo: parc.dtEmissao.split('-')[1],
//         ano: parc.dtEmissao.split('-')[0],
//       });
//     }
//     console.log(parcelas.length, 'parcelas');

//     return res.json(parcelas);
//   } catch (err) {
//     console.log(err);
//     return res.json('erro');
//   }
//   return res.json('ok');
// });
