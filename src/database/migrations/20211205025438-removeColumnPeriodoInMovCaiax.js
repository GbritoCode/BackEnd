module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('MovimentoCaixas', 'periodo', { transaction: t }),
  ])),
  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('MovimentoCaixas', 'periodo', {
      type: Sequelize.INTEGER,
      allowNull: false,
    }, { transaction: t }),
  ])),
};
