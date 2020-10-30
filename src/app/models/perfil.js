import { Model } from 'sequelize';
import Colab from './colab';
const { DataTypes } = require('sequelize');

class perfil extends Model {
  static init(sequelize) {
    super.init(
      {
        EmpresaId: DataTypes.INTEGER,
        desc: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
    perfil.hasOne(Colab, { onDelete: 'cascade', hooks: true });
    Colab.belongsTo(perfil);
    return this;
  }
}
export default perfil;
