/* eslint-disable no-param-reassign */
import { Model, DataTypes } from 'sequelize';

export default class CotacaoFiles extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
        path: DataTypes.STRING,
        CotacaoId: DataTypes.INTEGER,
        size: DataTypes.INTEGER,
      },
      {
        sequelize,
      },
    );

    return this;
  }
}
