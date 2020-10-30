import { Model } from 'sequelize';
import Cli_rec_desp from './cli_rec_desp';
const { DataTypes } = require('sequelize');

class Rec_desp extends Model {
  static init(sequelize) {
    super.init(
      {
        EmpresaId: DataTypes.INTEGER,
        desc: DataTypes.STRING,
        rec_desp: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
    Rec_desp.hasOne(Cli_rec_desp, { onDelete: 'cascade', hooks: true });
    Cli_rec_desp.belongsTo(Rec_desp);
    return this;
  }
}
export default Rec_desp;
