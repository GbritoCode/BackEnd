import Sequelize, { Model } from 'sequelize';
const { DataTypes } = require('sequelize');

class Rec_desp extends Model {
  static init(sequelize) {
    super.init(
      {
        EmpresaId: DataTypes.INTEGER,
        nome: DataTypes.STRING,
        license: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}
export default Rec_desp;
