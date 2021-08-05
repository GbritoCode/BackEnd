import { Model, DataTypes } from 'sequelize';
import FollowUps from './FollowUps';

export default class CamposDinamicosProspect extends Model {
  static init(sequelize) {
    super.init(
      {
        EmpresaId: DataTypes.INTEGER,
        nome: DataTypes.STRING,
        valor: DataTypes.STRING,
      },
      {
        sequelize,
      },
    );
    CamposDinamicosProspect.hasMany(FollowUps);
    FollowUps.belongsTo(CamposDinamicosProspect);
    return this;
  }
}
