/* eslint-disable no-param-reassign */
import { Model, DataTypes } from 'sequelize';
import Cotacao from './cotacao';
import Parcela from './parcela';

export default class CotacaoFiles extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
        path: DataTypes.STRING,
      },
      {
        sequelize,
      },
    );
    CotacaoFiles.hasMany(Cotacao, { onDelete: 'CASCADE', hooks: true });
    Cotacao.belongsTo(CotacaoFiles);
    CotacaoFiles.hasMany(Parcela, { onDelete: 'CASCADE', hooks: true });
    Parcela.belongsTo(CotacaoFiles);

    return this;
  }
}
