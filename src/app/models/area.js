import { Model } from 'sequelize';
const { DataTypes } = require('sequelize');
import Segmento from './segmento.js';

class Area extends Model {
  static init(sequelize) {
    super.init(
      {
        EmpresaId: DataTypes.INTEGER,
        descArea: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
    Area.hasOne(Segmento, { onDelete: 'cascade', hooks: true });
    Segmento.belongsTo(Area);
    return this;
  }
}
export default Area;
