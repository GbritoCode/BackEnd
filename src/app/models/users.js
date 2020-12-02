/* eslint-disable no-param-reassign */
import { Model } from 'sequelize';
import bcrypt from 'bcryptjs';
import Empresa from './empresa';

const { DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.VIRTUAL,
        passwordHash: DataTypes.STRING,
        provider: DataTypes.BOOLEAN,
      },
      {
        sequelize,
      },
    );
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.passwordHash = await bcrypt.hash(user.password, 8);
      }
    });
    User.hasOne(Empresa, { onDelete: 'CASCADE', hooks: true });
    Empresa.belongsTo(User);
    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.passwordHash);
  }
}
export default User;
