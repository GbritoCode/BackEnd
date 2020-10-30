import { Model } from 'sequelize';
const { DataTypes } = require('sequelize');


class Segmento extends Model {
  static init(sequelize) {
    super.init(
      {
        EmpresaId: DataTypes.INTEGER,
        UndNegId: DataTypes.INTEGER,
        ProdutoId: DataTypes.INTEGER,
        AreaId: DataTypes.INTEGER,
        descSegmt: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}
export default Segmento;
