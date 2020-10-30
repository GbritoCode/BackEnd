import { Model } from 'sequelize';
import Segmento from './segmento.js';

const { DataTypes } = require('sequelize');

class UndNeg extends Model {
  static init(sequelize) {
    super.init(
      {
        EmpresaId: DataTypes.INTEGER,
        descUndNeg: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
    UndNeg.hasOne(Segmento, { onDelete: 'cascade', hooks: true });
    Segmento.belongsTo(UndNeg);
    return this;
  }
}

export default UndNeg;
