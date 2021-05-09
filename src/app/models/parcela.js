import { Model, DataTypes } from 'sequelize';
import ParcelaFiles from './parcelaFile';

export default class Parcela extends Model {
  static init(sequelize) {
    super.init(
      {
        OportunidadeId: DataTypes.INTEGER,
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
    Parcela.hasMany(ParcelaFiles, { onDelete: 'CASCADE', hooks: true });
    ParcelaFiles.belongsTo(Parcela);
    return this;
  }
}
