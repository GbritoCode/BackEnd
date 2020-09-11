import Sequelize, { Model } from 'sequelize';
const { DataTypes } = require('sequelize');

class Colab_comp extends Model {
  static init(sequelize) {
    super.init(
      {
        ColabId: DataTypes.INTEGER,
        nivel: DataTypes.INTEGER,
        tipo_valor: DataTypes.DECIMAL,
        valor: DataTypes.DECIMAL,
        data_inic: DataTypes.DATE,
        data_fim: DataTypes.DATE,
        tipo_atend: DataTypes.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}
export default Colab_comp;
