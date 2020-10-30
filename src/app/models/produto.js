import { Model } from 'sequelize';

const { DataTypes } = require('sequelize');
import Segmento from './segmento.js';

class Produto extends Model {
  static init(sequelize) {
    super.init(
      {
        EmpresaId: DataTypes.INTEGER,
        descProdt: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
    Produto.hasOne(Segmento, { onDelete: 'cascade', hooks: true });
    Segmento.belongsTo(Produto);

    return this;
  }
}
export default Produto;
