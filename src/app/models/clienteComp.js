import { Model, DataTypes } from 'sequelize';

export default class CliComp extends Model {
  static init(sequelize) {
    super.init(
      {
        ClienteId: DataTypes.INTEGER,
        CondPgmtoId: DataTypes.INTEGER,
        cep: DataTypes.STRING,
        rua: DataTypes.STRING,
        numero: DataTypes.STRING,
        complemento: DataTypes.STRING,
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
