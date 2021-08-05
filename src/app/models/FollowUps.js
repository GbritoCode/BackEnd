import { Model, DataTypes } from 'sequelize';

export default class FollowUps extends Model {
  static init(sequelize) {
    super.init(
      {
        EmpresaId: DataTypes.INTEGER,
        ColabId: DataTypes.INTEGER,
        ClienteId: DataTypes.INTEGER,
        CliContId: DataTypes.INTEGER,
        dataContato: DataTypes.DATEONLY,
        dataProxContato: DataTypes.DATEONLY,
        detalhes: DataTypes.STRING,
        reacao: DataTypes.STRING,
        CampanhaId: DataTypes.INTEGER,
        proxPasso: DataTypes.INTEGER,
        prefContato: DataTypes.INTEGER,
        ativo: DataTypes.BOOLEAN,
        CamposDinamicosProspectId: DataTypes.INTEGER,
      },
      {
        sequelize,
      },
    );
    return this;
  }
}
