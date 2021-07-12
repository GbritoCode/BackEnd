import { Model, DataTypes } from 'sequelize';

export default class CamposDinamicosProspect extends Model {
  static init(sequelize) {
    super.init(
      {
        EmpresaId: DataTypes.INTEGER,
        nome: DataTypes.STRING,
        valor: DataTypes.STRING,
      },
      {
        sequelize,
      },
    );

    return this;
  }
}
