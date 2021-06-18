import { Model, DataTypes } from 'sequelize';
import Campanhas_Clientes from './Campanhas_Clientes';
import Cliente from './cliente';

export default class Campanhas extends Model {
  static init(sequelize) {
    super.init(
      {
        EmpresaId: DataTypes.INTEGER,
        desc: DataTypes.STRING,
        cod: DataTypes.STRING,
        objetivo: DataTypes.STRING,
        dataInic: DataTypes.DATEONLY,
        dataFim: DataTypes.DATEONLY,
        ColabId: DataTypes.INTEGER,
      },
      {
        sequelize,
      },
    );

    return this;
  }
}
