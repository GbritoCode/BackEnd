import { Model } from 'sequelize';
import Cli_comp from './cliente_comp';
import Fornec from './fornec';
const { DataTypes } = require('sequelize');

class condPgmto extends Model {
  static init(sequelize) {
    super.init(
      {
        EmpresaId: DataTypes.INTEGER,
        diasPrazo: DataTypes.INTEGER,
        desc: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
    condPgmto.hasOne(Cli_comp, { onDelete: 'cascade', hooks: true });
    Cli_comp.belongsTo(condPgmto);

    condPgmto.hasOne(Fornec, { onDelete: 'cascade', hooks: true });
    Fornec.belongsTo(condPgmto);
    return this;
  }
}
export default condPgmto;
