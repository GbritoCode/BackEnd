import { Model, DataTypes } from 'sequelize';
import RecDesp from './recDesp';

export default class ContaContabils extends Model {
  static init(sequelize) {
    super.init(
      {
        EmpresaId: DataTypes.INTEGER,
        cod: DataTypes.STRING,
        desc: DataTypes.STRING,
      },
      {
        sequelize,
      },
    );
    ContaContabils.hasOne(RecDesp, { onDelete: 'cascade', hooks: true });
    RecDesp.belongsTo(ContaContabils);

    return this;
  }
}
