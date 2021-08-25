import { Model, DataTypes } from 'sequelize';
import Campanhas from './campanhas';
import Cliente from './cliente';

export default class Campanhas_Clientes extends Model {
  static init(sequelize) {
    super.init(
      {
        CampanhaId: DataTypes.INTEGER,
        ClienteId: DataTypes.INTEGER,
        ativo: DataTypes.BOOLEAN,
        reuniaoAgend: DataTypes.DATEONLY,
        orcamentoSolict: DataTypes.DATEONLY,
        dataFim: DataTypes.DATEONLY,
        efetivacao: DataTypes.DATEONLY,
        status: DataTypes.STRING,
      },
      {
        sequelize,
      },

    );
    Cliente.belongsToMany(Campanhas, { through: 'Campanhas_Clientes', foreignKey: 'ClienteId' });
    Campanhas.belongsToMany(Cliente, { through: 'Campanhas_Clientes', foreignKey: 'CampanhaId' });
    Campanhas_Clientes.belongsTo(Cliente);
    Campanhas_Clientes.belongsTo(Campanhas);
    return this;
  }
}
