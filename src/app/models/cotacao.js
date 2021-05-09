import { Model, DataTypes } from 'sequelize';
import CotacaoFiles from './cotacaoFiles';

export default class Cotacao extends Model {
  static init(sequelize) {
    super.init(
      {
        EmpresaId: DataTypes.INTEGER,
        OportunidadeId: DataTypes.INTEGER,
        probVend: DataTypes.INTEGER,
        tipoCobranca: DataTypes.INTEGER,
        hrsPrevst: DataTypes.INTEGER,
        vlrProp: DataTypes.INTEGER,
        vlrDesc: DataTypes.INTEGER,
        vlrLiq: DataTypes.INTEGER,
        recLiq: DataTypes.INTEGER,
        prevLucro: DataTypes.INTEGER,
        numParcelas: DataTypes.INTEGER,
        motivo: DataTypes.STRING,
        desc: DataTypes.STRING,
      },
      {
        sequelize,
      },
    );
    Cotacao.hasMany(CotacaoFiles, { onDelete: 'CASCADE', hooks: true });
    CotacaoFiles.belongsTo(Cotacao);
    return this;
  }
}
