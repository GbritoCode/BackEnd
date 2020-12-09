import { Model, DataTypes } from 'sequelize';

import Oportunidade from './oportunidade';
import Segmento from './segmento';

export default class UndNeg extends Model {
  static init(sequelize) {
    super.init(
      {
        EmpresaId: DataTypes.INTEGER,
        descUndNeg: DataTypes.STRING,
      },
      {
        sequelize,
      },
    );
    UndNeg.hasOne(Segmento, { onDelete: 'cascade', hooks: true });
    Segmento.belongsTo(UndNeg);

    UndNeg.hasOne(Oportunidade, { onDelete: 'cascade', hooks: true });
    Oportunidade.belongsTo(UndNeg);
    return this;
  }
}
