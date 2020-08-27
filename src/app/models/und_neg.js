import Sequelize, { Model } from 'sequelize';
const { DataTypes } = require('sequelize');

class Und_neg extends Model {
  static init(sequelize) {
    super.init(
      {
        EmpresaId: DataTypes.INTEGER,
        desc_und_neg: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Und_neg;
