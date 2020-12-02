import { Model } from 'sequelize';

const { DataTypes } = require('sequelize');

class Parcela extends Model {
  static init(sequelize) {
    super.init(
      {
        oportunidadeId: DataTypes.INTEGER,
        parcela: DataTypes.INTEGER,
        vlrParcela: DataTypes.INTEGER,
        dtEmissao: DataTypes.DATEONLY,
        dtVencimento: DataTypes.DATEONLY,
        notaFiscal: DataTypes.STRING,
        pedidoCliente: DataTypes.STRING,
        situacao: DataTypes.INTEGER,
        dtLiquidacao: DataTypes.DATEONLY,
        vlrPago: DataTypes.INTEGER,
        saldo: DataTypes.INTEGER,

      },
      {
        sequelize,
      },
    );

    return this;
  }
}
export default Parcela;
