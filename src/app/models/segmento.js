import Sequelize, { Model } from 'sequelize';
const { DataTypes } = require('sequelize');

class Segmento extends Model {
  static init(sequelize) {
    super.init(
      {
        EmpresaId: DataTypes.INTEGER,
        Und_negId: DataTypes.INTEGER,
        ProdutoId: DataTypes.INTEGER,
        AreaId: DataTypes.INTEGER,
        desc_segmt: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}
export default Segmento;
