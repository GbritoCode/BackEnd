import { Model } from 'sequelize';

const { DataTypes } = require('sequelize');

class cliRecDesp extends Model {
  static init(sequelize) {
    super.init(
      {
        ClienteId: DataTypes.INTEGER,
        recDespId: DataTypes.INTEGER,
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
export default cliRecDesp;
