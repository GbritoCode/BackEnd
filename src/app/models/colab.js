import { Model } from 'sequelize';
import Colab_comp from './colab_comp.js';
const { DataTypes } = require('sequelize');
import perfil from './perfil.js';

class Colab extends Model {
  static init(sequelize) {
    super.init(
      {
        CPF: DataTypes.STRING,
        FornecId: DataTypes.INTEGER,
        PerfilId: DataTypes.INTEGER,
        EmpresaId: DataTypes.INTEGER,
        nome: DataTypes.STRING,
        dtAdmiss: DataTypes.DATE,
        cel: DataTypes.INTEGER,
        skype: DataTypes.STRING,
        email: DataTypes.STRING,
        espec: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
    Colab.hasOne(Colab_comp, { onDelete: 'cascade', hooks: true });
    Colab_comp.belongsTo(Colab);
    return this;
  }
}

export default Colab;
