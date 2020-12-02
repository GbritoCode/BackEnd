import { Model } from 'sequelize';
import Colab from './colab';

const { DataTypes } = require('sequelize');

class Fornec extends Model {
  static init(sequelize) {
    super.init(
      {
        CNPJ: DataTypes.STRING,
        EmpresaId: DataTypes.INTEGER,
        CondPgmtoId: DataTypes.INTEGER,
        nome: DataTypes.STRING,
        nomeConta: DataTypes.STRING,
        fone: DataTypes.INTEGER,
        cep: DataTypes.STRING,
        rua: DataTypes.STRING,
        numero: DataTypes.STRING,
        complemento: DataTypes.STRING,
        bairro: DataTypes.STRING,
        cidade: DataTypes.STRING,
        uf: DataTypes.STRING,
        banco: DataTypes.STRING,
        agencia: DataTypes.STRING,
        conta: DataTypes.STRING,
      },
      {
        sequelize,
      },
    );
    Fornec.hasOne(Colab, { onDelete: 'cascade', hooks: true });
    Colab.belongsTo(Fornec);
    return this;
  }
}

export default Fornec;
