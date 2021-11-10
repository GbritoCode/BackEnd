import { Model, DataTypes } from 'sequelize';

export default class Parametros extends Model {
  static init(sequelize) {
    super.init(
      {
        EmpresaId: DataTypes.INTEGER,
        IRPJ: DataTypes.DECIMAL,
        CSLL: DataTypes.DECIMAL,
        COFINS: DataTypes.DECIMAL,
        PIS: DataTypes.DECIMAL,
        INSS: DataTypes.DECIMAL,
        ISS: DataTypes.DECIMAL,
        PSProLabor: DataTypes.DECIMAL,
        IRRFProLabor: DataTypes.DECIMAL,
        vlrMinHr: DataTypes.DECIMAL,
        vlrBsHr: DataTypes.DECIMAL,
        vlrBsDesp: DataTypes.DECIMAL,
        adiantaPgmto: DataTypes.STRING,
        percAdiantaPgmto: DataTypes.DECIMAL,
        compHrs: DataTypes.INTEGER,
        pgmtoVenc: DataTypes.INTEGER,
      },
      {
        sequelize,
      },
    );

    return this;
  }
}
