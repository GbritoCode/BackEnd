import { Model } from 'sequelize';
import Oportunidade from './oportunidade';
import recDesp from './recDesp';

const { DataTypes } = require('sequelize');

class itmControle extends Model {
  static init(sequelize) {
    super.init(
      {
        EmpresaId: DataTypes.INTEGER,
        descItem: DataTypes.STRING,
        tipoItem: DataTypes.STRING,
        contaContabil: DataTypes.STRING,
        centCusto: DataTypes.STRING,
      },
      {
        sequelize,
      },
    );
    itmControle.hasOne(Oportunidade, { onDelete: 'cascade', hooks: true });
    Oportunidade.belongsTo(itmControle);
    itmControle.hasOne(recDesp, { onDelete: 'cascade', hooks: true });
    recDesp.belongsTo(itmControle);
    return this;
  }
}
export default itmControle;
