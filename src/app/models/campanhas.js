import { Model, DataTypes } from 'sequelize';

import FollowUps from './FollowUps';
import Oportunidade from './oportunidade';

export default class Campanhas extends Model {
  static init(sequelize) {
    super.init(
      {
        EmpresaId: DataTypes.INTEGER,
        desc: DataTypes.STRING,
        cod: DataTypes.STRING,
        objetivo: DataTypes.STRING,
        dataInic: DataTypes.DATEONLY,
        dataFim: DataTypes.DATEONLY,
        ColabId: DataTypes.INTEGER,
        dashFields: DataTypes.STRING,
      },
      {
        sequelize,
      },
    );
    Campanhas.hasMany(FollowUps, { onDelete: 'cascade', hooks: true });
    FollowUps.belongsTo(Campanhas);
    Campanhas.hasMany(Oportunidade, { onDelete: 'cascade', hooks: true });
    Oportunidade.belongsTo(Campanhas);
    return this;
  }
}
