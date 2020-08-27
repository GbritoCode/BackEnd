import Sequelize, { Model } from 'sequelize';
const { DataTypes } = require('sequelize');

class Cli_comp extends Model {
  static init(sequelize) {
    super.init(
      {
        ClienteId: DataTypes.INTEGER,
        rz_social: DataTypes.STRING,
        cond_pgmto: DataTypes.DECIMAL,
        nome_abv: DataTypes.STRING,
        cep: DataTypes.STRING,
        rua: DataTypes.STRING,
        numero: DataTypes.DECIMAL,
        bairro: DataTypes.STRING,
        cidade: DataTypes.STRING,
        uf: DataTypes.STRING,
        insc_mun: DataTypes.STRING,
        insc_uf: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Cli_comp;
