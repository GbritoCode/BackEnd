import { Model, DataTypes } from 'sequelize';

import Oportunidade from './oportunidade';
import Recurso from './recurso';
import ColabComp from './colabComp';
import Horas from './horas';
import Despesas from './despesas';
import ResultPeriodo from './resultPeriodo';

export default class Colab extends Model {
  static init(sequelize) {
    super.init(
      {
        CPF: DataTypes.STRING,
        FornecId: DataTypes.INTEGER,
        PerfilId: DataTypes.INTEGER,
        EmpresaId: DataTypes.INTEGER,
        UserId: DataTypes.INTEGER,
        nome: DataTypes.STRING,
        dtAdmiss: DataTypes.DATE,
        cel: DataTypes.INTEGER,
        skype: DataTypes.STRING,
        email: DataTypes.STRING,
        espec: DataTypes.STRING,
        aniver: DataTypes.DATEONLY,
      },
      {
        sequelize,
      },
    );
    Colab.hasOne(ColabComp, { onDelete: 'cascade', hooks: true });
    ColabComp.belongsTo(Colab);

    Colab.hasOne(Oportunidade, { onDelete: 'cascade', hooks: true });
    Oportunidade.belongsTo(Colab);

    Colab.hasMany(Recurso, { onDelete: 'cascade', hooks: true });
    Recurso.belongsTo(Colab);

    Colab.hasMany(Horas, { onDelete: 'cascade', hooks: true });
    Horas.belongsTo(Colab);

    Colab.hasMany(Despesas, { onDelete: 'cascade', hooks: true });
    Despesas.belongsTo(Colab);

    Colab.hasMany(ResultPeriodo, { onDelete: 'cascade', hooks: true });
    ResultPeriodo.belongsTo(Colab);
    return this;
  }
}
