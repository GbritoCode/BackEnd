import { Model } from 'sequelize';

const { DataTypes } = require('sequelize');

class Cotacao extends Model {
  static init(sequelize) {
    super.init(
      {
        EmpresaId: DataTypes.INTEGER,
        oportunidadeId: DataTypes.INTEGER,
        probVend: DataTypes.INTEGER,
        tipoCobranca: DataTypes.INTEGER,
        hrsPrevst: DataTypes.INTEGER,
        vlrProp: DataTypes.INTEGER,
        vlrDesc: DataTypes.INTEGER,
        vlrLiq: DataTypes.INTEGER,
        recLiq: DataTypes.INTEGER,
        prevLucro: DataTypes.INTEGER,
        numParcelas: DataTypes.INTEGER,
        motivo: DataTypes.STRING,
        desc: DataTypes.STRING,
      },
      {
        sequelize,
      },
    );

    return this;
  }
}
export default Cotacao;
