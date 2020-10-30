import { Model } from 'sequelize';

import Cliente from './cliente';
const { DataTypes } = require('sequelize');

class Representante extends Model {
  static init(sequelize) {
    super.init(
      {
        EmpresaId: DataTypes.INTEGER,
        nome: DataTypes.STRING,
        TipoComisseId: DataTypes.DECIMAL,
        vlrFixMens: DataTypes.DECIMAL,
      },
      {
        sequelize,
      }
    );
    Representante.hasOne(Cliente, { onDelete: 'cascade', hooks: true });
    Cliente.belongsTo(Representante);
    return this;
  }
}
export default Representante;
