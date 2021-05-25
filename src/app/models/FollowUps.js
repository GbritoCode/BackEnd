import { Model, DataTypes } from 'sequelize';

export default class FollowUps extends Model {
  static init(sequelize) {
    super.init(
      {
        EmpresaId: DataTypes.INTEGER,
        ColabId: DataTypes.INTEGER,
        ClienteId: DataTypes.INTEGER,
        CliContId: DataTypes.INTEGER,
        dataContato: DataTypes.DATEONLY,
        dataProxContato: DataTypes.DATEONLY,
        detalhes: DataTypes.STRING,
        reacao: DataTypes.STRING,
      },
      {
        sequelize,
      },
    );
    return this;
  }
}
