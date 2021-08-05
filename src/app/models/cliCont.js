import { Model, DataTypes } from 'sequelize';
import FollowUps from './FollowUps';

export default class CliCont extends Model {
  static init(sequelize) {
    super.init(
      {
        ClienteId: DataTypes.INTEGER,
        nome: DataTypes.STRING,
        cel: DataTypes.STRING,
        fone: DataTypes.STRING,
        skype: DataTypes.STRING,
        email: DataTypes.STRING,
        aniver: DataTypes.DATE,
        linkedin: DataTypes.STRING,
        cargo: DataTypes.STRING,
        ramal: DataTypes.STRING,
      },
      {
        sequelize,
      },
    );
    CliCont.hasMany(FollowUps, { onDelete: 'cascade', hooks: true });
    FollowUps.belongsTo(CliCont);
    return this;
  }
}
