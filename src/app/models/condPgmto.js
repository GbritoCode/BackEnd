import { Model, DataTypes } from 'sequelize';

import CliComp from './clienteComp';
import Fornec from './fornec';

export default class CondPgmto extends Model {
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
    CondPgmto.hasOne(CliComp, { onDelete: 'cascade', hooks: true });
    CliComp.belongsTo(CondPgmto);

    CondPgmto.hasOne(Fornec, { onDelete: 'cascade', hooks: true });
    Fornec.belongsTo(CondPgmto);
    return this;
  }
}
