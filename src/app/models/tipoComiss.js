import { Model } from 'sequelize';
import Cliente from './cliente';
import Representante from './representante';

const { DataTypes } = require('sequelize');

class tipoComisse extends Model {
  static init(sequelize) {
    super.init(
      {
        EmpresaId: DataTypes.INTEGER,
        desc: DataTypes.STRING,
        prcnt: DataTypes.REAL,
        bsComiss: DataTypes.STRING,
      },
      {
        sequelize,
      },
    );
    tipoComisse.hasOne(Cliente, { onDelete: 'cascade', hooks: true });
    Cliente.belongsTo(tipoComisse);
    tipoComisse.hasOne(Representante, { onDelete: 'cascade', hooks: true });
    Representante.belongsTo(tipoComisse);

    return this;
  }
}
export default tipoComisse;
