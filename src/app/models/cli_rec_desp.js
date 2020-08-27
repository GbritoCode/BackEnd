import Sequelize, { Model } from 'sequelize';
const { DataTypes } = require('sequelize');

class Cli_rec_desp extends Model {
  static init(sequelize) {
    super.init(
      {
        ClienteId: DataTypes.INTEGER,
        tipo_rec_desp: DataTypes.DECIMAL,
        nome_rec_desp: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}
export default Cli_rec_desp;
