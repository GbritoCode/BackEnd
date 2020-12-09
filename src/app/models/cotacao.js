import { Model, DataTypes } from 'sequelize';

export default class Cotacao extends Model {
  static init(sequelize) {
    super.init(
      {
        EmpresaId: DataTypes.INTEGER,
        OportunidadeId: DataTypes.INTEGER,
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
