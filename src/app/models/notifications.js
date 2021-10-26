import { Model, DataTypes } from 'sequelize';

export default class Notifications extends Model {
  static init(sequelize) {
    super.init(
      {
        EmpresaId: DataTypes.INTEGER,
        ColabId: DataTypes.INTEGER,
        read: DataTypes.BOOLEAN,
        content: DataTypes.STRING,
      },
      {
        sequelize,
      },
    );

    return this;
  }
}
