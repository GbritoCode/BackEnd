import { Model, DataTypes } from 'sequelize';
import Colab from './colab';

export default class MovimentoCaixa extends Model {
  static init(sequelize) {
    super.init(
      {
        EmpresaId: DataTypes.INTEGER,
        RecDespId: DataTypes.INTEGER,
        ColabCreate: DataTypes.INTEGER,
        ColabLiqui: DataTypes.INTEGER,
        FornecId: DataTypes.INTEGER,
        ClienteId: DataTypes.INTEGER,
        valor: DataTypes.FLOAT,
        dtVenc: DataTypes.DATEONLY,
        dtLiqui: DataTypes.DATEONLY,
        status: DataTypes.INTEGER,
      },
      {
        sequelize,
      },
    );

    // MovimentoCaixa.belongsTo(Colab, {  });

    return this;
  }
}
