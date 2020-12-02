import { Model } from 'sequelize';
import CliRecDesp from './cliRecDesp';

const { DataTypes } = require('sequelize');

class recDesp extends Model {
  static init(sequelize) {
    super.init(
      {
        EmpresaId: DataTypes.INTEGER,
        itmControleId: DataTypes.INTEGER,
        desc: DataTypes.STRING,
        recDesp: DataTypes.STRING,
      },
      {
        sequelize,
      },
    );
    recDesp.hasOne(CliRecDesp, { onDelete: 'cascade', hooks: true });
    CliRecDesp.belongsTo(recDesp);
    return this;
  }
}
export default recDesp;
