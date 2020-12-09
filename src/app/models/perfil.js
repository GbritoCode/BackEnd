import { Model, DataTypes } from 'sequelize';

import Colab from './colab';

export default class Perfil extends Model {
  static init(sequelize) {
    super.init(
      {
        EmpresaId: DataTypes.INTEGER,
        desc: DataTypes.STRING,
      },
      {
        sequelize,
      },
    );
    Perfil.hasOne(Colab, { onDelete: 'cascade', hooks: true });
    Colab.belongsTo(Perfil);
    return this;
  }
}
