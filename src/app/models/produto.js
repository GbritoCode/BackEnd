import Sequelize, { Model } from 'sequelize';
const { DataTypes } = require('sequelize');

class Produto extends Model {
  static init(sequelize) {
    super.init(
      {
        EmpresaId: DataTypes.INTEGER,
        desc_prodt: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}
export default Produto;
