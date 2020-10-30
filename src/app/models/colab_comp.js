import { Model } from 'sequelize';

const { DataTypes } = require('sequelize');

class Colab_comp extends Model {
  static init(sequelize) {
    super.init(
      {
        ColabId: DataTypes.INTEGER,
        nivel: DataTypes.INTEGER,
        tipoValor: DataTypes.DECIMAL,
        valor: DataTypes.DECIMAL,
        dataInic: DataTypes.DATE,
        dataFim: DataTypes.DATE,
        tipoAtend: DataTypes.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}
export default Colab_comp;
