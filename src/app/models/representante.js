import { Model, DataTypes } from 'sequelize';

import Cliente from './cliente';
import Oportunidade from './oportunidade';

export default class Representante extends Model {
  static init(sequelize) {
    super.init(
      {
        EmpresaId: DataTypes.INTEGER,
        nome: DataTypes.STRING,
        TipoComisseId: DataTypes.DECIMAL,
        vlrFixMens: DataTypes.DECIMAL,
        ColabId: DataTypes.INTEGER,
      },
      {
        sequelize,
      },
    );
    Representante.hasOne(Cliente, { onDelete: 'cascade', hooks: true });
    Cliente.belongsTo(Representante);

    Representante.hasOne(Oportunidade, { onDelete: 'cascade', hooks: true });
    Oportunidade.belongsTo(Representante);
    return this;
  }
}
