import { Model, DataTypes } from 'sequelize';

export default class LiquidMovCaixa extends Model {
  static init(sequelize) {
    super.init(
      {
        MovimentoCaixaId: DataTypes.INTEGER,
        valor: DataTypes.FLOAT,
        dtLiqui: DataTypes.DATEONLY,
        recDesp: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isIn: [['Rec', 'Desp']],
          },
        },
      },
      {
        sequelize,
      },
    );

    return this;
  }
}
