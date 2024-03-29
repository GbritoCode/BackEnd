import { Model, DataTypes } from 'sequelize';

import Oportunidade from './oportunidade';
import Recurso from './recurso';
import ColabComp from './colabComp';
import Horas from './horas';
import Despesas from './despesas';
import ResultPeriodo from './resultPeriodo';
import FollowUps from './FollowUps';
import Campanhas from './campanhas';
import Representante from './representante';
import MovimentoCaixa from './movimentoCaixa';
import Notifications from './notifications';

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
        recebeFixo: DataTypes.BOOLEAN,
        vlrFixo: DataTypes.FLOAT,
        PeriodToken: DataTypes.STRING(500),
      },
      {
        sequelize,
      },
    );
    Colab.hasOne(ColabComp, { onDelete: 'cascade', hooks: true });
    ColabComp.belongsTo(Colab);

    Colab.hasMany(Oportunidade, { onDelete: 'cascade', hooks: true });
    Oportunidade.belongsTo(Colab);

    Colab.hasMany(Recurso, { onDelete: 'cascade', hooks: true });
    Recurso.belongsTo(Colab);

    Colab.hasMany(Horas, { onDelete: 'cascade', hooks: true });
    Horas.belongsTo(Colab);

    Colab.hasMany(Despesas, { onDelete: 'cascade', hooks: true });
    Despesas.belongsTo(Colab);

    Colab.hasMany(ResultPeriodo, { onDelete: 'cascade', hooks: true });
    ResultPeriodo.belongsTo(Colab);

    Colab.hasMany(FollowUps, { onDelete: 'cascade', hooks: true });
    FollowUps.belongsTo(Colab);

    Colab.hasMany(Campanhas, { onDelete: 'cascade', hooks: true });
    Campanhas.belongsTo(Colab);

    Colab.hasOne(Representante, { onDelete: 'cascade', hooks: true });
    Representante.belongsTo(Colab);

    Colab.hasMany(MovimentoCaixa, {
      onDelete: 'cascade', hooks: true, foreignKey: 'ColabCreate', sourceKey: 'id', as: 'ColabCreated',
    });
    MovimentoCaixa.belongsTo(Colab, { foreignKey: 'ColabCreate', as: 'ColabCreated' });

    Colab.hasMany(MovimentoCaixa, {
      onDelete: 'cascade', hooks: true, foreignKey: 'ColabLiqui', sourceKey: 'id', as: 'ColabLiquid',
    });
    MovimentoCaixa.belongsTo(Colab, { foreignKey: 'ColabLiqui', as: 'ColabLiquid' });

    Colab.hasMany(MovimentoCaixa, {
      onDelete: 'cascade', hooks: true, foreignKey: 'ColabPgmto', sourceKey: 'id', as: 'ColabPgmt',
    });
    MovimentoCaixa.belongsTo(Colab, { foreignKey: 'ColabPgmto', as: 'ColabPgmt' });

    Colab.hasMany(Notifications, { onDelete: 'cascade', hooks: true });
    Notifications.belongsTo(Colab);
    return this;
  }
}
