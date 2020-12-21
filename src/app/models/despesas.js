import { Model, DataTypes } from 'sequelize';

export default class Despesas extends Model {
  static init(sequelize) {
    super.init(
      {
        OportunidadeId: DataTypes.INTEGER,
        ColabId: DataTypes.INTEGER,
        dataDespesa: DataTypes.DATEONLY,
        tipoDespesa: DataTypes.INTEGER,
        valorDespesa: DataTypes.INTEGER,
        desc: DataTypes.STRING,
      },
      {
        sequelize,
      },
    );

    return this;
  }
}
