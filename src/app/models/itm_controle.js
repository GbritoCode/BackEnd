import Sequelize, { Model } from 'sequelize';
const { DataTypes } = require('sequelize');

class Itm_controle extends Model {
  static init(sequelize) {
    super.init(
      {
        EmpresaId: DataTypes.INTEGER,
        desc_item: DataTypes.STRING,
        tipo_item: DataTypes.INTEGER,
        conta_contabil: DataTypes.INTEGER,
        cent_custo: DataTypes.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}
export default Itm_controle;
