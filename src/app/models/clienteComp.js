import { Model } from 'sequelize';

const { DataTypes } = require('sequelize');

class CliComp extends Model {
  static init(sequelize) {
    super.init(
      {
        ClienteId: DataTypes.INTEGER,
        CondPgmtoId: DataTypes.INTEGER,
        rzSocial: DataTypes.STRING,
        fantasia: DataTypes.STRING,
        nomeAbv: DataTypes.STRING,
        cep: DataTypes.STRING,
        rua: DataTypes.STRING,
        numero: DataTypes.STRING,
        bairro: DataTypes.STRING,
        cidade: DataTypes.STRING,
        uf: DataTypes.STRING,
        inscMun: DataTypes.STRING,
        inscEst: DataTypes.STRING,
      },
      {
        sequelize,
      },
    );
    return this;
  }
}

export default CliComp;
