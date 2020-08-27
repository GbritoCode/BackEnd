import Sequelize, { Model } from 'sequelize';
const { DataTypes } = require('sequelize');

class Parametros extends Model {
  static init(sequelize) {
    super.init(
      {
        EmpresaId: DataTypes.INTEGER,
        impostos: DataTypes.DECIMAL,
        vlr_min_hr: DataTypes.DECIMAL,
        vlr_bs_hr: DataTypes.DECIMAL,
        vlr_bs_desp: DataTypes.DECIMAL,
        adianta_pgmto: DataTypes.INTEGER,
        perc_adianta_pgmto: DataTypes.DECIMAL,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Parametros;
