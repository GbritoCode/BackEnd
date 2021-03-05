import { Model, DataTypes, Op } from 'sequelize';
import Colab from './colab';
import Horas from './horas';
import Recurso from './recurso';
import ResultPeriodo from './resultPeriodo';

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
    });
    this.addHook('beforeUpdate', async (fechamento) => {
      const data = [];

      await Colab.update({ PeriodToken: '' }, { where: { id: { [Op.not]: null } } });
      // ----------------------horas
      const horas = await fechamento.sequelize.models.Horas.findAll({
        where: {
          dataAtivd: { [Op.between]: [fechamento.dataInic, fechamento.dataFim] },
        },
        attributes: [
          'ColabId',
          [sequelize.fn('sum', sequelize.col('totalApont')), 'total'],
        ],
        group: ['ColabId'],
      });
      if (horas.length > 0) {
        for (let i = 0; i < horas.length; i++) {
          data[i] = {
            ColabId: horas[i].dataValues.ColabId,
            totalHrs: horas[i].dataValues.total,
            totalDesp: 0,
            totalReceb: 0,
          };
        }
      } else {
        data[0] = {
          ColabId: 0,
          totalHrs: 0,
          totalDesp: 0,
          totalReceb: 0,
        };
      }

      // --------------------despesas
      const despesas = await fechamento.sequelize.models.Despesas.findAll({
        where: {
          dataDespesa: { [Op.between]: [fechamento.dataInic, fechamento.dataFim] },
        },
        attributes: [
          'ColabId',
          [sequelize.fn('sum', sequelize.col('valorDespesa')), 'total'],
        ],
        group: ['ColabId'],
      });
      if (despesas.length > 0) {
        for (let i = 0; i < despesas.length; i++) {
          Object.entries(data).forEach((entry) => {
            if (entry[1].ColabId === despesas[i].dataValues.ColabId) {
              entry[1].totalDesp = despesas[i].dataValues.total;
            }
            if ((data.find((d) => d.ColabId === despesas[i].dataValues.ColabId)) === undefined) {
              data.push({
                ColabId: despesas[i].dataValues.ColabId,
                totalHrs: 0,
                totalDesp: despesas[i].dataValues.total,
                totalReceb: despesas[i].dataValues.total,
              });
            }
          });
        }
      } else {
        Object.entries(data).forEach((entry) => {
          entry[1].totalDesp = 0;
        });
      }
      // --------------------Receber

      const receber = await fechamento.sequelize.models.Colab.findAll({
        include: [{
          model: Recurso,
          required: true,
          include: [{
            model: Horas,
            where: {
              dataAtivd: {
                [Op.between]: [fechamento.dataInic, fechamento.dataFim],
              },
            },
            required: true,
          }],
        }],
      });
      const sum = [];
      let sumColab = 0;
      for (let i = 0; i < receber.length; i++) {
        sumColab = 0;
        for (let j = 0; j < receber[i].Recursos.length; j++) {
          for (let k = 0; k < receber[i].Recursos[j].Horas.length; k++) {
            sumColab += (receber[i].Recursos[j].Horas[k].dataValues.totalApont / 60)
            * receber[i].Recursos[j].dataValues.colabVlrHr;
          }
        }
        sum[i] = Math.trunc(sumColab);
        Object.entries(data).forEach((entry) => {
          if (entry[1].ColabId === receber[i].dataValues.id) {
            entry[1].totalReceb = parseInt(sum[i], 10) + parseInt(entry[1].totalDesp, 10);
          }
          if ((data.find((d) => d.ColabId === receber[i].dataValues.id)) === undefined) {
            data.push({
              ColabId: receber[i].dataValues.id,
              totalHrs: 0,
              totalDesp: 0,
              totalReceb: sum[i],
            });
          }
        });
      }

      Object.entries(data).forEach((entry) => {
        entry[1].periodo = fechamento.nome;
        entry[1].EmpresaId = fechamento.EmpresaId;
      });

      const alreadyHasPeriodo = await fechamento.sequelize.models.ResultPeriodo.findOne({
        where: { [Op.and]: [{ periodo: fechamento.nome }, { ano: fechamento.ano }] },
      });
      if (alreadyHasPeriodo) {
        Object.entries(data).forEach(async (entry) => {
          await fechamento.sequelize.models.ResultPeriodo.update(
            {
              totalHrs: entry[1].totalHrs,
              totalDesp: entry[1].totalDesp,
              totalReceb: entry[1].totalReceb,
            },
            { where: { [Op.and]: [{ ColabId: entry[1].ColabId }, { periodo: fechamento.nome }, { ano: fechamento.ano }] } },
            { returning: true },
          );
          // .then((result) => console.log(result));
        });
      } else {
        await fechamento.sequelize.models.ResultPeriodo.bulkCreate(data, { updateOnDuplicate: ['periodo'] }, { returning: true })
          .then((result) => console.log(result));
      }
    });
    return this;
  }
}
