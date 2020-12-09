import { Model, DataTypes } from 'sequelize';

export default class ColabComp extends Model {
  static init(sequelize) {
    super.init(
      {
        ColabId: DataTypes.INTEGER,
        nivel: DataTypes.INTEGER,
        tipoValor: DataTypes.DECIMAL,
        valor: DataTypes.DECIMAL,
        dataInic: DataTypes.DATE,
        dataFim: DataTypes.DATE,
        tipoAtend: DataTypes.INTEGER,
      },
      {
        sequelize,
      },
    );

    return this;
  }
}
