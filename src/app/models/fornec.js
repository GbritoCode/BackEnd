import { Model, DataTypes } from 'sequelize';

import Colab from './colab';
import MovimentoCaixa from './movimentoCaixa';

export default class Fornec extends Model {
  static init(sequelize) {
    super.init(
      {
        CNPJ: DataTypes.STRING,
        EmpresaId: DataTypes.INTEGER,
        CondPgmtoId: DataTypes.INTEGER,
        RecDespId: DataTypes.INTEGER,
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

    Fornec.hasMany(MovimentoCaixa, { onDelete: 'cascade', hooks: true });
    MovimentoCaixa.belongsTo(Fornec);
    return this;
  }
}
