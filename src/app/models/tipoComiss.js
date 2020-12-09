import { Model, DataTypes } from 'sequelize';

import Cliente from './cliente';
import Representante from './representante';

export default class TipoComisse extends Model {
  static init(sequelize) {
    super.init(
      {
        EmpresaId: DataTypes.INTEGER,
        desc: DataTypes.STRING,
        prcnt: DataTypes.REAL,
        bsComiss: DataTypes.STRING,
      },
      {
        sequelize,
      },
    );
    TipoComisse.hasOne(Cliente, { onDelete: 'cascade', hooks: true });
    Cliente.belongsTo(TipoComisse);
    TipoComisse.hasOne(Representante, { onDelete: 'cascade', hooks: true });
    Representante.belongsTo(TipoComisse);

    return this;
  }
}
