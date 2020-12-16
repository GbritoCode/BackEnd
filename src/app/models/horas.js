import { Model, DataTypes } from 'sequelize';

export default class Horas extends Model {
  static init(sequelize) {
    super.init(
      {
        OportunidadeId: DataTypes.INTEGER,
        ColabId: DataTypes.INTEGER,
        horaInic: DataTypes.STRING,
        horaIntrv: DataTypes.STRING,
        horaFim: DataTypes.STRING,
        dataLancamento: DataTypes.DATE,
        totalApont: DataTypes.STRING,
        horaInicAudit: DataTypes.STRING,
        horaIntrvAudit: DataTypes.STRING,
        horaFimAudit: DataTypes.STRING,
        dataLancamentoAudit: DataTypes.DATE,
        totalApontAudit: DataTypes.STRING,
        solicitante: DataTypes.STRING,
        AreaId: DataTypes.INTEGER,
        desc: DataTypes.STRING,
      },
      {
        sequelize,
      },
    );

    return this;
  }
}
