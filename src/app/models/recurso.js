import { Model, DataTypes } from 'sequelize';
import Horas from './horas';

export default class Recurso extends Model {
  static init(sequelize) {
    super.init(
      {
        OportunidadeId: DataTypes.INTEGER,
        ColabId: DataTypes.INTEGER,
        tipoValor: DataTypes.INTEGER,
        tipoAtend: DataTypes.INTEGER,
        custoPrev: DataTypes.INTEGER,
        custoPrevAux: DataTypes.FLOAT,
        dataInclusao: DataTypes.DATEONLY,
        hrsPrevst: DataTypes.INTEGER,
        colabVlrHr: DataTypes.INTEGER,
        colabVlrHrAux: DataTypes.FLOAT,
      },
      {
        sequelize,
      },
    );
    Recurso.hasMany(Horas, { onDelete: 'cascade', hooks: true });
    Horas.belongsTo(Recurso);
    return this;
  }
}
