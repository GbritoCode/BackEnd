import { Model } from 'sequelize';
import CliComp from './clienteComp';
import Fornec from './fornec';

const { DataTypes } = require('sequelize');

class condPgmto extends Model {
  static init(sequelize) {
    super.init(
      {
        EmpresaId: DataTypes.INTEGER,
        cod: DataTypes.STRING,
        diasPrazo: DataTypes.INTEGER,
        desc: DataTypes.STRING,
      },
      {
        sequelize,
      },
    );
    condPgmto.hasOne(CliComp, { onDelete: 'cascade', hooks: true });
    CliComp.belongsTo(condPgmto);

    condPgmto.hasOne(Fornec, { onDelete: 'cascade', hooks: true });
    Fornec.belongsTo(condPgmto);
    return this;
  }
}
export default condPgmto;
