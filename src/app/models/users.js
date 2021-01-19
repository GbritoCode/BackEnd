/* eslint-disable no-param-reassign */

import bcrypt from 'bcryptjs';
import { Model, DataTypes } from 'sequelize';
import Colab from './colab';
import Empresa from './empresa';

export default class User extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
        email: DataTypes.STRING,
        senha: DataTypes.VIRTUAL,
        passwordHash: DataTypes.STRING,
        profile: DataTypes.INTEGER,
        aniver: DataTypes.DATEONLY,
      },
      {
        sequelize,
      },
    );
    this.addHook('beforeSave', async (user) => {
      if (user.senha) {
        user.passwordHash = await bcrypt.hash(user.senha, 8);
      }
    });
    User.hasOne(Empresa, { onDelete: 'CASCADE', hooks: true });
    Empresa.belongsTo(User);

    User.hasOne(Colab, { onDelete: 'CASCADE', hooks: true });
    Colab.belongsTo(User);
    return this;
  }

  checkPassword(senha) {
    return bcrypt.compare(senha, this.passwordHash);
  }
}
