import { Model } from 'sequelize';

const { DataTypes } = require('sequelize');

class Itm_controle extends Model {
  static init(sequelize) {
    super.init(
      {
        EmpresaId: DataTypes.INTEGER,
        descItem: DataTypes.STRING,
        tipoItem: DataTypes.STRING,
        contaContabil: DataTypes.STRING,
        centCusto: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}
export default Itm_controle;
