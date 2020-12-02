import { Model } from 'sequelize';
import Cotacao from './cotacao';
import Parcela from './parcela';
import Recurso from './recurso';

const { DataTypes } = require('sequelize');

class Oportunidade extends Model {
  static init(sequelize) {
    super.init(
      {
        EmpresaId: DataTypes.INTEGER,
        colabId: DataTypes.INTEGER,
        data: DataTypes.DATEONLY,
        fase: DataTypes.STRING,
        clienteId: DataTypes.INTEGER,
        contato: DataTypes.INTEGER,
        cod: DataTypes.STRING,
        UndNegId: DataTypes.INTEGER,
        itmControleId: DataTypes.INTEGER,
        segmentoId: DataTypes.INTEGER,
        representanteId: DataTypes.INTEGER,
        desc: DataTypes.STRING,
        narrativa: DataTypes.STRING,
      },
      {
        sequelize,
      },
    );
    Oportunidade.hasOne(Cotacao, { onDelete: 'cascade', hooks: true });
    Cotacao.belongsTo(Oportunidade);
    Oportunidade.hasOne(Recurso, { onDelete: 'cascade', hooks: true });
    Recurso.belongsTo(Oportunidade);
    Oportunidade.hasOne(Parcela, { onDelete: 'cascade', hooks: true });
    Parcela.belongsTo(Oportunidade);
    return this;
  }
}
export default Oportunidade;
