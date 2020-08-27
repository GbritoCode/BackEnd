import Sequelize, { Model } from 'sequelize';
const { DataTypes } = require('sequelize');

class Representante extends Model {
  static init(sequelize) {
    super.init(
      {
        EmpresaId: DataTypes.INTEGER,
        nome: DataTypes.STRING,
        percnt_comiss: DataTypes.DECIMAL,
        vlr_fix_mens: DataTypes.DECIMAL,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}
export default Representante;
