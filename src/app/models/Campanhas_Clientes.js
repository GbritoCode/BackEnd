import { Model, DataTypes } from 'sequelize';
import Campanhas from './campanhas';
import Cliente from './cliente';

export default class Campanhas_Clientes extends Model {
  static init(sequelize) {
    super.init(
      {
        CampanhaId: DataTypes.INTEGER,
        ClienteId: DataTypes.INTEGER,
      },
      {
        sequelize,
      },

    );
    Cliente.belongsToMany(Campanhas, { through: 'Campanhas_Clientes', foreignKey: 'ClienteId' });
    Campanhas.belongsToMany(Cliente, { through: 'Campanhas_Clientes', foreignKey: 'CampanhaId' });
    return this;
  }
}
