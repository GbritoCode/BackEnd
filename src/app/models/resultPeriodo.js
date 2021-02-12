import { Model, DataTypes } from 'sequelize';

export default class ResultPeriodo extends Model {
  static init(sequelize) {
    super.init(
      {
        EmpresaId: DataTypes.INTEGER,
        ColabId: DataTypes.INTEGER,
        totalHrs: DataTypes.STRING,
        totalDesp: DataTypes.STRING,
        totalReceb: DataTypes.STRING,
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
