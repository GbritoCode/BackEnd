import Sequelize, { Model } from 'sequelize';
const { DataTypes } = require('sequelize');

class Colab extends Model {
  static init(sequelize) {
    super.init(
      {
        CPF: DataTypes.STRING,
        FornecId: DataTypes.INTEGER,
        log_usr: DataTypes.INTEGER,
        EmpresaId: DataTypes.INTEGER,
        nome: DataTypes.STRING,
        dt_admiss: DataTypes.DATE,
        cel: DataTypes.INTEGER,
        skype: DataTypes.STRING,
        email: DataTypes.STRING,
        espec: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Colab;
