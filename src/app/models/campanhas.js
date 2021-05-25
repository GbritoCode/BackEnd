import { Model, DataTypes } from 'sequelize';
import Cliente from './cliente';

export default class Campanhas extends Model {
  static init(sequelize) {
    super.init(
      {
        EmpresaId: DataTypes.INTEGER,
        desc: DataTypes.STRING,
        cod: DataTypes.STRING,
      },
      {
        sequelize,
      },
    );
    Campanhas.hasMany(Cliente, { onDelete: 'cascade', hooks: true });
    Cliente.belongsTo(Campanhas);
    return this;
  }
}
