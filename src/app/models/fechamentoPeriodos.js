import { Model, DataTypes, Op } from 'sequelize';
import Colab from './colab';
import Horas from './horas';
import MovimentoCaixa from './movimentoCaixa';
import Parametros from './parametros';
import Recurso from './recurso';
import ResultPeriodo from './resultPeriodo';
import ResultPeriodoGerencial from './resultPeriodoGerencial';
import resultPeriodoGerencial from './resultPeriodoGerencial';

export default class FechamentoPeriodo extends Model {
  static init(sequelize) {
    super.init(
      {
        EmpresaId: DataTypes.INTEGER,
        nome: DataTypes.STRING,
        ano: DataTypes.STRING,
        dataInic: DataTypes.DATEONLY,
        dataFim: DataTypes.DATEONLY,
        situacao: DataTypes.STRING,
      },
      {
        sequelize,
      },
    );
    this.addHook('afterBulkCreate', async (records) => {
      const totalColabs = await Colab.findAll();
      Object.entries(records).forEach((periodoEntry) => {
        Object.entries(totalColabs).forEach(async (colabEntry) => {
          await ResultPeriodo.create({
            EmpresaId: periodoEntry[1].EmpresaId,
            ColabId: colabEntry[1].id,
            totalHrs: 0,
            totalDesp: 0,
            totalReceb: 0,
            periodo: periodoEntry[1].nome,
            ano: periodoEntry[1].ano,
          });
        });
      });
      Object.entries(records).forEach(async (periodoEntry) => {
        await resultPeriodoGerencial.create({
          EmpresaId: periodoEntry[1].EmpresaId,
          totalHrs: 0,
          totalDesp: 0,
          totalReceb: 0,
          periodo: periodoEntry[1].nome,
          ano: periodoEntry[1].ano,
        });
      });
    });
    // this.addHook('beforeUpdate', async (fechamento) => {
    //   const data = [];

    //   await Horas.destroy(
    //     {
    //       where: {
    //         compFlag: 1,
    //         dataAtivd: { [Op.between]: [fechamento.dataInic, fechamento.dataFim] },
    //       },
    //     },
    //   );
    //   await ResultPeriodo.update({
    //     totalHrs: 0,
    //     totalDesp: 0,
    //     totalReceb: 0,
    //   },
    //   {
    //     where: {
    //       periodo: fechamento.nome, ano: fechamento.ano,
    //     },
    //   });
    //   await ResultPeriodoGerencial.update({
    //     totalHrs: 0,
    //     totalDesp: 0,
    //     totalReceb: 0,
    //   },
    //   {
    //     where: {
    //       periodo: fechamento.nome, ano: fechamento.ano,
    //     },
    //   });
    //   const colabs = await Colab.findAll();

    //   await Colab.update({ PeriodToken: '' }, { where: { id: { [Op.not]: null } } });
    //   // ----------------------horas
    //   const horas = await fechamento.sequelize.models.Horas.findAll({
    //     where: {
    //       dataAtivd: { [Op.between]: [fechamento.dataInic, fechamento.dataFim] },
    //       // compFlag: { [Op.ne]: 1 },
    //     },
    //     attributes: [
    //       'ColabId',
    //       [sequelize.fn('sum', sequelize.col('totalApont')), 'total'],
    //     ],
    //     group: ['ColabId'],
    //   });
    //   if (horas.length > 0) {
    //     for (let i = 0; i < horas.length; i++) {
    //       data[i] = {
    //         ColabId: horas[i].dataValues.ColabId,
    //         totalHrs: horas[i].dataValues.total,
    //         totalDesp: 0,
    //         totalReceb: 0,
    //       };
    //     }
    //   } else {
    //     data[0] = {
    //       ColabId: 0,
    //       totalHrs: 0,
    //       totalDesp: 0,
    //       totalReceb: 0,
    //     };
    //   }

    //   // --------------------despesas
    //   const despesas = await fechamento.sequelize.models.Despesas.findAll({
    //     where: {
    //       dataDespesa: { [Op.between]: [fechamento.dataInic, fechamento.dataFim] },
    //     },
    //     attributes: [
    //       'ColabId',
    //       [sequelize.fn('sum', sequelize.col('valorDespesa')), 'total'],
    //     ],
    //     group: ['ColabId'],
    //   });
    //   if (despesas.length > 0) {
    //     for (let i = 0; i < despesas.length; i++) {
    //       Object.entries(data).forEach((entry) => {
    //         if (entry[1].ColabId === despesas[i].dataValues.ColabId) {
    //           entry[1].totalDesp = despesas[i].dataValues.total;
    //         }
    //         if ((data.find((d) => d.ColabId === despesas[i].dataValues.ColabId)) === undefined) {
    //           data.push({
    //             ColabId: despesas[i].dataValues.ColabId,
    //             totalHrs: 0,
    //             totalDesp: despesas[i].dataValues.total,
    //             totalReceb: despesas[i].dataValues.total,
    //           });
    //         }
    //       });
    //     }
    //   } else {
    //     Object.entries(data).forEach((entry) => {
    //       entry[1].totalDesp = 0;
    //     });
    //   }
    //   // --------------------Receber

    //   const receber = await fechamento.sequelize.models.Colab.findAll({
    //     include: [{
    //       model: Recurso,
    //       required: true,
    //       include: [{
    //         model: Horas,
    //         where: {
    //           dataAtivd: {
    //             [Op.between]: [fechamento.dataInic, fechamento.dataFim],
    //           },
    //         },
    //         required: true,
    //       }],
    //     }],
    //   });
    //   const sum = [];
    //   let sumColab = 0;
    //   for (let i = 0; i < receber.length; i++) {
    //     sumColab = 0;
    //     for (let j = 0; j < receber[i].Recursos.length; j++) {
    //       for (let k = 0; k < receber[i].Recursos[j].Horas.length; k++) {
    //         // if (receber[i].Recursos[j].dataValues.tipoAtend !== '4') {
    //         // }
    //         sumColab += (receber[i].Recursos[j].Horas[k].dataValues.totalApont / 60)
    //         * receber[i].Recursos[j].dataValues.colabVlrHr;
    //       }
    //     }
    //     sum[i] = Math.trunc(sumColab);
    //     Object.entries(data).forEach((entry) => {
    //       if (entry[1].ColabId === receber[i].dataValues.id) {
    //         entry[1].totalReceb = parseInt(sum[i], 10) + parseInt(entry[1].totalDesp, 10);
    //       }
    //       if ((data.find((d) => d.ColabId === receber[i].dataValues.id)) === undefined) {
    //         data.push({
    //           ColabId: receber[i].dataValues.id,
    //           totalHrs: 0,
    //           totalDesp: 0,
    //           totalReceb: sum[i],
    //         });
    //       }
    //     });
    //   }

    //   Object.entries(data).forEach((entry) => {
    //     entry[1].periodo = fechamento.nome;
    //     entry[1].EmpresaId = fechamento.EmpresaId;
    //   });

    //   const alreadyHasPeriodo = await fechamento.sequelize.models.ResultPeriodo.findOne({
    //     where: { [Op.and]: [{ periodo: fechamento.nome }, { ano: fechamento.ano }] },
    //   });
    //   if (alreadyHasPeriodo) {
    //     Object.entries(data).forEach(async (entry) => {
    //       await ResultPeriodo.update(
    //         {
    //           totalHrs: entry[1].totalHrs,
    //           totalDesp: entry[1].totalDesp,
    //           totalReceb: entry[1].totalReceb,
    //         },
    //         {
    //           where: {
    //             [Op.and]: [{ ColabId: entry[1].ColabId },
    //               { periodo: fechamento.nome }, { ano: fechamento.ano }],
    //           },
    //         },
    //       );

    //       const mov = await MovimentoCaixa.findOne({ where: { desc: `Valor referente a horas e despesas lançadas pelo colaborador ${colabs.find((arr) => arr.id === entry[1].ColabId).nome} no período ${fechamento.nome} - ${fechamento.ano}` } });
    //       if (mov) {
    //         await mov.update(
    //           {
    //             EmpresaId: fechamento.EmpresaId,
    //             RecDespId: 1,
    //             ColabCreate: 1,
    //             ColabPgmto: entry[1].ColabId,
    //             valor: entry[1].totalReceb,
    //             dtVenc: new Date().setDate(15),
    //             status: 1,
    //             desc:
    //              `Valor referente a horas e despesas lançadas pelo colaborador ${colabs.find((arr) => arr.id === entry[1].ColabId).nome} no período ${fechamento.nome} - ${fechamento.ano}`,
    //           },
    //           { returning: true },
    //         );
    //       } else if (entry[1].totalReceb > 0) {
    //         await MovimentoCaixa.create(
    //           {
    //             EmpresaId: fechamento.EmpresaId,
    //             RecDespId: 1,
    //             ColabCreate: 1,
    //             ColabPgmto: entry[1].ColabId,
    //             valor: entry[1].totalReceb,
    //             dtVenc: new Date().setDate(15),
    //             status: 1,
    //             desc:
    //                `Valor referente a horas e despesas lançadas pelo colaborador ${colabs.find((arr) => arr.id === entry[1].ColabId).nome} no período ${fechamento.nome} - ${fechamento.ano}`,
    //           },
    //           { returning: true },
    //         );
    //       }
    //       // .then((result) => console.log(result));
    //     });
    //   } else {
    //     await fechamento.sequelize.models.ResultPeriodo.bulkCreate(data, { updateOnDuplicate: ['periodo'] }, { returning: true });
    //   }

    //   const param = await Parametros.findOne();
    //   const totalHrsMes = param.compHrs * 60;

    //   const compRec = await Recurso.findAll(
    //     {
    //       where: { tipoAtend: 4 },
    //       include:
    //          [
    //            {
    //              model: Colab,
    //              include:
    //               [
    //                 {
    //                   model: ResultPeriodo,
    //                   where: { ano: '2021', periodo: 'Outubro' },
    //                   required: false,
    //                 },
    //               ],
    //            },
    //          ],
    //     },
    //   );
    //   compRec.forEach(async (rec) => {
    //     const colab = rec.Colab;
    //     let hrsLancadas = 0;
    //     colab.ResultPeriodos.forEach((periodo) => {
    //       hrsLancadas += periodo.dataValues.totalHrs;
    //     });
    //     // console.log(colab.ResultPeriodos);
    //     // console.log(hrsLancadas);
    //     console.log('hrsLancadas');
    //     const saldoHrs = totalHrsMes - hrsLancadas;
    //     console.log(saldoHrs);

    //     if (saldoHrs > 0) {
    //       console.log(saldoHrs > 0);
    //       await Horas.create({
    //         OportunidadeId: rec.OportunidadeId,
    //         ColabId: colab.id,
    //         RecursoId: rec.id,
    //         dataAtivd: new Date().toDateString(),
    //         horaInic: '00:00',
    //         horaIntrv: '00:00',
    //         horaFim: '00:00',
    //         dataLancamento: new Date().toDateString(),
    //         totalApont: saldoHrs,
    //         solicitante: 'Juliano',
    //         AreaId: 1,
    //         compFlag: 1,
    //         desc: `Lançamento de Horas complementares ${saldoHrs / 60}`,
    //       });
    //       const mov = await MovimentoCaixa.findOne({ where: { desc: `Valor referente a horas complementares do colaborador ${colabs.find((arr) => arr.id === colab.id).nome} no período ${fechamento.nome} - ${fechamento.ano}` } });
    //       await ResultPeriodo.increment(
    //         {
    //           totalHrs: saldoHrs,
    //           totalReceb: (saldoHrs / 60) * rec.colabVlrHr,
    //         },
    //         {
    //           where: {
    //             [Op.and]: [{ ColabId: colab.id },
    //               { periodo: fechamento.nome }, { ano: fechamento.ano }],
    //           },
    //         },
    //         { returning: true },
    //       );
    //       console.log('teste');
    //       console.log('teste');
    //       console.log('teste');
    //       if (mov) {
    //         await mov.update(
    //           {
    //             EmpresaId: fechamento.EmpresaId,
    //             RecDespId: 1,
    //             ColabCreate: 1,
    //             ColabPgmto: colab.id,
    //             valor: (saldoHrs / 60) * rec.colabVlrHr,
    //             dtVenc: new Date().setDate(15),
    //             status: 1,
    //             desc:
    //            `Valor referente a horas complementares do colaborador ${colabs.find((arr) => arr.id === colab.id).nome} no período ${fechamento.nome} - ${fechamento.ano}`,
    //           },
    //           { returning: true },
    //         );
    //       } else {
    //         await MovimentoCaixa.create(
    //           {
    //             EmpresaId: fechamento.EmpresaId,
    //             RecDespId: 1,
    //             ColabCreate: 1,
    //             ColabPgmto: colab.id,
    //             valor: (saldoHrs / 60) * rec.colabVlrHr,
    //             dtVenc: new Date().setDate(15),
    //             status: 1,
    //             desc:
    //            `Valor referente a horas complementares do colaborador ${colabs.find((arr) => arr.id === colab.id).nome} no período ${fechamento.nome} - ${fechamento.ano}`,
    //           },
    //           { returning: true },
    //         );
    //       }
    //     } else {
    //       console.log('----------');
    //       console.log('----------');
    //       console.log('----------');
    //       console.log('----------');
    //       console.log('----------');
    //     }
    //   });

    //   const result = await ResultPeriodo.findAll({
    //     where: { ano: '2021', periodo: 'Outubro' },
    //     attributes: [
    //       'periodo',
    //       [sequelize.fn('sum', sequelize.col('totalHrs')), 'totalHrs'],
    //       [sequelize.fn('sum', sequelize.col('totalDesp')), 'totalDesp'],
    //       [sequelize.fn('sum', sequelize.col('totalReceb')), 'totalReceb'],
    //     ],
    //     group: ['periodo'],
    //   });
    //   console.log('result');
    //   console.log('result');
    //   console.log('result');
    //   console.log(result);
    //   await resultPeriodoGerencial.update(
    //     {
    //       totalHrs: result[0].dataValues.totalHrs,
    //       totalDesp: result[0].dataValues.totalDesp,
    //       totalReceb: result[0].dataValues.totalReceb,
    //     },
    //     {
    //       where: {
    //         [Op.and]: [{ periodo: fechamento.nome }, { ano: fechamento.ano }],
    //       },
    //     },
    //     { returning: true },
    //   )
    //     .then((result) => console.log(result));
    // });
    // this.addHook('afterUpdate', async (fechamento) => {
    //   console.log('result');
    //   console.log('result');
    //   console.log('result');
    //   console.log('result');
    //   console.log('result');
    //   const result = await ResultPeriodo.findAll({
    //     where: { ano: fechamento.ano, periodo: fechamento.nome },
    //     attributes: [
    //       'periodo',
    //       [sequelize.fn('sum', sequelize.col('totalHrs')), 'totalHrs'],
    //       [sequelize.fn('sum', sequelize.col('totalDesp')), 'totalDesp'],
    //       [sequelize.fn('sum', sequelize.col('totalReceb')), 'totalReceb'],
    //     ],
    //     group: ['periodo'],
    //   });
    //   console.log(result);
    //   console.log('result');
    //   console.log('result');
    //   console.log('result');
    //   console.log('result');
    //   Object.entries(result).forEach(async (entry) => {
    //     await resultPeriodoGerencial.update(
    //       {
    //         totalHrs: entry[1].dataValues.totalHrs,
    //         totalDesp: entry[1].dataValues.totalDesp,
    //         totalReceb: entry[1].dataValues.totalReceb,
    //       },
    //       {
    //         where: {
    //           [Op.and]: [{ periodo: fechamento.nome }, { ano: fechamento.ano }],
    //         },
    //       },
    //       { returning: true },
    //     );
    //   });
    // });
    return this;
  }
}
