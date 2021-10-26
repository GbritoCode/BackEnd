module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('MovimentoCaixas', 'ColabPgmto', {
      allowNull: true,
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: 'Colabs',
        key: 'id',
      },
    }, { transaction: t }),
  ])),
  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('MovimentoCaixas', 'ColabPgmto', { transaction: t }),
  ])),
};
