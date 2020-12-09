import { Model, DataTypes } from 'sequelize';

export default class CliCont extends Model {
  static init(sequelize) {
    super.init(
      {
        ClienteId: DataTypes.INTEGER,
        nome: DataTypes.STRING,
        cel: DataTypes.STRING,
        fone: DataTypes.STRING,
        skype: DataTypes.STRING,
        email: DataTypes.STRING,
        aniver: DataTypes.DATE,
        tipoConta: DataTypes.STRING,
      },
      {
        sequelize,
      },
    );

    return this;
  }
}
