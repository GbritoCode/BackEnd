import { Model } from 'sequelize';

const { DataTypes } = require('sequelize');

class cliCont extends Model {
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

export default cliCont;
