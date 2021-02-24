import { Model, DataTypes } from 'sequelize';

import Cotacao from './cotacao';
import Despesas from './despesas';
import Horas from './horas';
import Parcela from './parcela';
import Recurso from './recurso';

export default class Oportunidade extends Model {
  static init(sequelize) {
    super.init(
      {
        EmpresaId: DataTypes.INTEGER,
        ColabId: DataTypes.INTEGER,
        data: DataTypes.DATEONLY,
        fase: DataTypes.INTEGER,
        ClienteId: DataTypes.INTEGER,
        contato: DataTypes.INTEGER,
        cod: DataTypes.STRING,
        UndNegId: DataTypes.INTEGER,
        SegmentoId: DataTypes.INTEGER,
        RepresentanteId: DataTypes.INTEGER,
        RecDespId: DataTypes.INTEGER,
        desc: DataTypes.STRING,
        narrativa: DataTypes.STRING,
        totalHoras: DataTypes.INTEGER,
        motivo: DataTypes.STRING,
      },
      {
        sequelize,
      },
    );
    Oportunidade.hasOne(Cotacao, { onDelete: 'cascade', hooks: true });
    Cotacao.belongsTo(Oportunidade);

    Oportunidade.hasOne(Recurso, { onDelete: 'cascade', hooks: true });
    Recurso.belongsTo(Oportunidade);

    Oportunidade.hasMany(Parcela, { onDelete: 'cascade', hooks: true });
    Parcela.belongsTo(Oportunidade);

    Oportunidade.hasOne(Horas, { onDelete: 'cascade', hooks: true });
    Horas.belongsTo(Oportunidade);

    Oportunidade.hasOne(Despesas, { onDelete: 'cascade', hooks: true });
    Despesas.belongsTo(Oportunidade);
    return this;
  }
}
