import { Model, DataTypes } from 'sequelize';

export default class FechamentoCaixaMensal extends Model {
  static init(sequelize) {
    super.init(
      {
        EmpresaId: DataTypes.INTEGER,
        saldoMes: DataTypes.FLOAT,
        entrada: DataTypes.FLOAT,
        saida: DataTypes.FLOAT,
        saldoMesPrev: DataTypes.FLOAT,
        entradaPrev: DataTypes.FLOAT,
        saidaPrev: DataTypes.FLOAT,
        saldoLastDay: DataTypes.FLOAT,
        recLastDay: DataTypes.FLOAT,
        despLastDay: DataTypes.FLOAT,
        periodo: DataTypes.STRING,
        ano: DataTypes.INTEGER,
      },
      {
        sequelize,
      },
    );

    return this;
  }
}
