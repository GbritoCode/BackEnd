import Sequelize, { Model } from 'sequelize';

class Cli_cont extends Model {
  static init(sequelize) {
    super.init(
      {
        ClienteId: Sequelize.INTEGER,
        nome: Sequelize.STRING,
        cel: Sequelize.NUMBER,
        fone: Sequelize.NUMBER,
        skype: Sequelize.STRING,
        email: Sequelize.STRING,
        aniver: Sequelize.DATE,
        tipo_conta: Sequelize.NUMBER,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Cli_cont;
