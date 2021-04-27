import { Model, DataTypes } from 'sequelize';

export default class ParametrosEmail extends Model {
  static init(sequelize) {
    super.init(
      {
        EmpresaId: DataTypes.INTEGER,
        bccEmailOrc: DataTypes.STRING,
        bccEmailRev: DataTypes.STRING,
        bccEmailFat: DataTypes.STRING,
        fromEmailOrc: DataTypes.STRING,
        fromEmailRev: DataTypes.STRING,
        fromEmailFat: DataTypes.STRING,
      },
      {
        sequelize,
      },
    );
    return this;
  }
}
