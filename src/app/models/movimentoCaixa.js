import { Model, DataTypes } from 'sequelize';

export default class MovimentoCaixa extends Model {
  static init(sequelize) {
    super.init(
      {
        EmpresaId: DataTypes.INTEGER,
        RecDespId: DataTypes.INTEGER,
        ColabCreate: DataTypes.INTEGER,
        ColabLiqui: DataTypes.INTEGER,
        ColabPgmto: DataTypes.INTEGER,
        FornecId: DataTypes.INTEGER,
        ClienteId: DataTypes.INTEGER,
        ParcelaId: DataTypes.INTEGER,
        valor: DataTypes.FLOAT,
        dtVenc: DataTypes.DATEONLY,
        dtLiqui: DataTypes.DATEONLY,
        status: DataTypes.INTEGER,
        desc: DataTypes.STRING,
      },
      {
        sequelize,
      },
    );

    return this;
  }
}
