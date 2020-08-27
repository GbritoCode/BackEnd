import Sequelize, { Model } from 'sequelize';
const { DataTypes } = require('sequelize');

class Fornec extends Model {
  static init(sequelize) {
    super.init(
      {
        CNPJ: DataTypes.STRING,
        EmpresaId: DataTypes.INTEGER,
        nome: DataTypes.STRING,
        cond_pgmto: DataTypes.INTEGER,
        nome_conta: DataTypes.STRING,
        fone: DataTypes.INTEGER,
        cep: DataTypes.STRING,
        rua: DataTypes.STRING,
        numero: DataTypes.INTEGER,
        complemento: DataTypes.INTEGER,
        bairro: DataTypes.STRING,
        cidade: DataTypes.STRING,
        uf: DataTypes.STRING,
        banco: DataTypes.STRING,
        agencia: DataTypes.STRING,
        conta: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Fornec;
