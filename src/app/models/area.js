import Sequelize, { Model } from 'sequelize';
const { DataTypes } = require('sequelize');

class Area extends Model {
  static init(sequelize) {
    super.init(
      {
        EmpresaId: DataTypes.INTEGER,
        desc_area: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}
export default Area;
