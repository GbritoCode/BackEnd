import { Model, DataTypes } from 'sequelize';

export default class ResultPeriodoGerencial extends Model {
  static init(sequelize) {
    super.init(
      {
        EmpresaId: DataTypes.INTEGER,
        totalHrs: DataTypes.INTEGER,
        totalDesp: DataTypes.INTEGER,
        totalReceb: DataTypes.INTEGER,
        periodo: DataTypes.STRING,
        ano: DataTypes.STRING,
      },
      {
        sequelize,
      },
    );

    return this;
  }
}
