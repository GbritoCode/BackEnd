import { Model, DataTypes } from 'sequelize';
import RecDesp from './recDesp';

export default class CentroCustos extends Model {
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
    CentroCustos.hasOne(RecDesp, { onDelete: 'cascade', hooks: true });
    RecDesp.belongsTo(CentroCustos);
    return this;
  }
}
