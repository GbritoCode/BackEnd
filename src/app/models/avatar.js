/* eslint-disable no-param-reassign */
import { Model, DataTypes } from 'sequelize';

import User from './users';

export default class Avatar extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
        path: DataTypes.STRING,
      },
      {
        sequelize,
      },
    );
    Avatar.hasOne(User, { onDelete: 'CASCADE', hooks: true });
    User.belongsTo(Avatar);

    return this;
  }
}
