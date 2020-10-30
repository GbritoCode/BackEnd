import { Model } from 'sequelize';

const { DataTypes } = require('sequelize');

class Cli_rec_desp extends Model {
  static init(sequelize) {
    super.init(
      {
        ClienteId: DataTypes.INTEGER,
        recDespId: DataTypes.INTEGER,
        tipoCobranca: DataTypes.STRING,
        valorRec: DataTypes.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}
export default Cli_rec_desp;
