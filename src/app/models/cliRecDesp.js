import { Model, DataTypes } from 'sequelize';

export default class CliRecDesp extends Model {
  static init(sequelize) {
    super.init(
      {
        ClienteId: DataTypes.INTEGER,
        RecDespId: DataTypes.INTEGER,
        tipoCobranca: DataTypes.STRING,
        valorRec: DataTypes.INTEGER,
        dataInic: DataTypes.DATEONLY,
        dataFim: DataTypes.DATEONLY,
      },
      {
        sequelize,
      },
    );

    return this;
  }
}
