import { Model } from 'sequelize';
import ColabComp from './colabComp';
import Oportunidade from './oportunidade';
import Recurso from './recurso';

const { DataTypes } = require('sequelize');

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
      },
    );
    Colab.hasOne(ColabComp, { onDelete: 'cascade', hooks: true });
    ColabComp.belongsTo(Colab);

    Colab.hasOne(Oportunidade, { onDelete: 'cascade', hooks: true });
    Oportunidade.belongsTo(Colab);

    Colab.hasOne(Recurso, { onDelete: 'cascade', hooks: true });
    Recurso.belongsTo(Colab);
    return this;
  }
}

export default Colab;
