import { Model, DataTypes } from 'sequelize';

import Oportunidade from './oportunidade';

export default class Segmento extends Model {
  static init(sequelize) {
    super.init(
      {
        EmpresaId: DataTypes.INTEGER,
        UndNegId: DataTypes.INTEGER,
        ProdutoId: DataTypes.INTEGER,
        AreaId: DataTypes.INTEGER,
        descSegmt: DataTypes.STRING,
      },
      {
        sequelize,
      },
    );
    Segmento.hasOne(Oportunidade, { onDelete: 'cascade', hooks: true });
    Oportunidade.belongsTo(Segmento);
    return this;
  }
}
