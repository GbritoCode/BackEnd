import { Model } from 'sequelize';

const { DataTypes } = require('sequelize');

class Recurso extends Model {
  static init(sequelize) {
    super.init(
      {
        oportunidadeId: DataTypes.INTEGER,
        colabId: DataTypes.INTEGER,
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

export default Recurso;
