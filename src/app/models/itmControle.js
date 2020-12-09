import { Model, DataTypes } from 'sequelize';

import Oportunidade from './oportunidade';
import recDesp from './recDesp';

export default class ItmControle extends Model {
  static init(sequelize) {
    super.init(
      {
        EmpresaId: DataTypes.INTEGER,
        descItem: DataTypes.STRING,
        tipoItem: DataTypes.STRING,
        contaContabil: DataTypes.STRING,
        centCusto: DataTypes.STRING,
      },
      {
        sequelize,
      },
    );
    ItmControle.hasOne(Oportunidade, { onDelete: 'cascade', hooks: true });
    Oportunidade.belongsTo(ItmControle);
    ItmControle.hasOne(recDesp, { onDelete: 'cascade', hooks: true });
    recDesp.belongsTo(ItmControle);
    return this;
  }
}
