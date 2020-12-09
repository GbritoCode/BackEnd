import { Model, DataTypes } from 'sequelize';

import Segmento from './segmento';

export default class Area extends Model {
  static init(sequelize) {
    super.init(
      {
        EmpresaId: DataTypes.INTEGER,
        descArea: DataTypes.STRING,
      },
      {
        sequelize,
      },
    );
    Area.hasOne(Segmento, { onDelete: 'cascade', hooks: true });
    Segmento.belongsTo(Area);
    return this;
  }
}
