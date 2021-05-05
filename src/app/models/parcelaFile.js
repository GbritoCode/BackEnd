/* eslint-disable no-param-reassign */
import { Model, DataTypes } from 'sequelize';

export default class ParcelaFiles extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
        path: DataTypes.STRING,
        ParcelaId: DataTypes.INTEGER,
      },
      {
        sequelize,
      },
    );

    return this;
  }
}
