import { Model, DataTypes } from 'sequelize';

export default class Recurso extends Model {
  static init(sequelize) {
    super.init(
      {
        OportunidadeId: DataTypes.INTEGER,
        ColabId: DataTypes.INTEGER,
        tipoValor: DataTypes.INTEGER,
        tipoAtend: DataTypes.INTEGER,
        custoPrev: DataTypes.INTEGER,
        dataInclusao: DataTypes.DATEONLY,
        hrsPrevst: DataTypes.INTEGER,
        colabVlrHr: DataTypes.INTEGER,
      },
      {
        sequelize,
      },
    );

    return this;
  }
}
