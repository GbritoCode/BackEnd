import { Model, DataTypes } from 'sequelize';

import CliRecDesp from './cliRecDesp';

export default class RecDesp extends Model {
  static init(sequelize) {
    super.init(
      {
        EmpresaId: DataTypes.INTEGER,
        ItmControleId: DataTypes.INTEGER,
        desc: DataTypes.STRING,
        recDesp: DataTypes.STRING,
      },
      {
        sequelize,
      },
    );
    RecDesp.hasOne(CliRecDesp, { onDelete: 'cascade', hooks: true });
    CliRecDesp.belongsTo(RecDesp);
    return this;
  }
}
