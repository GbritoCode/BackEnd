import { Model } from 'sequelize';

import Segmento from './segmento';

const { DataTypes } = require('sequelize');

class Produto extends Model {
  static init(sequelize) {
    super.init(
      {
        EmpresaId: DataTypes.INTEGER,
        descProdt: DataTypes.STRING,
      },
      {
        sequelize,
      },
    );
    Produto.hasOne(Segmento, { onDelete: 'cascade', hooks: true });
    Segmento.belongsTo(Produto);

    return this;
  }
}
export default Produto;
