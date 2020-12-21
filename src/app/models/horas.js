import { Model, DataTypes } from 'sequelize';

export default class Horas extends Model {
  static init(sequelize) {
    super.init(
      {
        OportunidadeId: DataTypes.INTEGER,
        ColabId: DataTypes.INTEGER,
        dataAtivd: DataTypes.DATEONLY,
        horaInic: DataTypes.STRING,
        horaIntrv: DataTypes.STRING,
        horaFim: DataTypes.STRING,
        dataLancamento: DataTypes.DATE,
        totalApont: DataTypes.INTEGER,
        horaInicAudit: DataTypes.STRING,
        horaIntrvAudit: DataTypes.STRING,
        horaFimAudit: DataTypes.STRING,
        dataAtivdAudit: DataTypes.DATE,
        totalApontAudit: DataTypes.INTEGER,
        solicitante: DataTypes.STRING,
        AreaId: DataTypes.INTEGER,
        desc: DataTypes.STRING,
        apontDiff: DataTypes.VIRTUAL,
      },
      {
        sequelize,
      },
    );

    this.addHook('afterCreate', async (horas) => {
      horas.sequelize.models.Oportunidade.increment({ totalHoras: horas.totalApont },
        { where: { id: horas.OportunidadeId } });
    });
    this.addHook('afterUpdate', async (horas) => {
      horas.sequelize.models.Oportunidade.increment({ totalHoras: horas.apontDiff },
        { where: { id: horas.OportunidadeId } });
    });
    return this;
  }
}
