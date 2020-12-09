import { Model, DataTypes } from 'sequelize';

export default class Horas extends Model {
  static init(sequelize) {
    super.init(
      {
        OportunidadeId: DataTypes.INTEGER,
        ColabId: DataTypes.INTEGER,
        horaInic: DataTypes.DATE,
        horaIntrv: DataTypes.DATE,
        horaFim: DataTypes.DATE,
        dataLancamento: DataTypes.DATE,
        totalApont: DataTypes.DATE,
        totalAcum: DataTypes.DATE,
        horaInicAudit: DataTypes.DATE,
        horaIntrvAudit: DataTypes.DATE,
        horaFimAudit: DataTypes.DATE,
        dataLancamentoAudit: DataTypes.DATE,
        totalApontAudit: DataTypes.DATE,
        totalAcumAudit: DataTypes.DATE,
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
