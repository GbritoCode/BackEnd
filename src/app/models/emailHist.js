/* eslint-disable no-param-reassign */
import { Model, DataTypes } from 'sequelize';

export default class EmailHists extends Model {
  static init(sequelize) {
    super.init(
      {
        copias: DataTypes.STRING,
        file: DataTypes.STRING,
        tipo: DataTypes.STRING,
        idAux: DataTypes.INTEGER,
      },
      {
        sequelize,
      },
    );

    return this;
  }
}
