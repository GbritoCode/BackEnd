import { Model, DataTypes } from 'sequelize';

import CliRecDesp from './cliRecDesp';
import Oportunidade from './oportunidade';

export default class RecDesp extends Model {
  static init(sequelize) {
    super.init(
      {
        EmpresaId: DataTypes.INTEGER,
        desc: DataTypes.STRING,
        recDesp: DataTypes.STRING,
        tipoItem: DataTypes.STRING,
        contaContabil: DataTypes.STRING,
        centCusto: DataTypes.STRING,
      },
      {
        sequelize,
      },
    );
    RecDesp.hasOne(CliRecDesp, { onDelete: 'cascade', hooks: true });
    CliRecDesp.belongsTo(RecDesp);
    RecDesp.hasOne(Oportunidade, { onDelete: 'cascade', hooks: true });
    Oportunidade.belongsTo(RecDesp);
    return this;
  }
}
