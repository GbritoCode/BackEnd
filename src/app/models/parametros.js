import { Model } from 'sequelize';

const { DataTypes } = require('sequelize');

class Parametros extends Model {
  static init(sequelize) {
    super.init(
      {
        EmpresaId: DataTypes.INTEGER,
        impostos: DataTypes.DECIMAL,
        vlrMinHr: DataTypes.DECIMAL,
        vlrBsHr: DataTypes.DECIMAL,
        vlrBsDesp: DataTypes.DECIMAL,
        adiantaPgmto: DataTypes.STRING,
        percAdiantaPgmto: DataTypes.DECIMAL,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Parametros;
