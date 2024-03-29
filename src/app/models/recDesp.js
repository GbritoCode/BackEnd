import { Model, DataTypes } from 'sequelize';

import CliRecDesp from './cliRecDesp';
import Despesas from './despesas';
import MovimentoCaixa from './movimentoCaixa';
import Oportunidade from './oportunidade';

export default class RecDesp extends Model {
  static init(sequelize) {
    super.init(
      {
        EmpresaId: DataTypes.INTEGER,
        desc: DataTypes.STRING,
        recDesp: DataTypes.STRING,
        tipoItem: DataTypes.STRING,
        lancFlag: DataTypes.BOOLEAN,
        ContaContabilId: DataTypes.STRING,
        CentroCustoId: DataTypes.STRING,
      },
      {
        sequelize,
      },
    );
    RecDesp.hasOne(CliRecDesp, { onDelete: 'cascade', hooks: true });
    CliRecDesp.belongsTo(RecDesp);
    RecDesp.hasOne(Oportunidade, { onDelete: 'cascade', hooks: true });
    Oportunidade.belongsTo(RecDesp);
    RecDesp.hasMany(MovimentoCaixa, { onDelete: 'cascade', hooks: true });
    MovimentoCaixa.belongsTo(RecDesp);
    RecDesp.hasMany(Despesas, { onDelete: 'cascade', hooks: true });
    Despesas.belongsTo(RecDesp);
    return this;
  }
}
