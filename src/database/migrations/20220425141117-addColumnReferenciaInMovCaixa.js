module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('MovimentoCaixas', 'referencia', {
      type: Sequelize.STRING,
      allowNull: true,
    }, { transaction: t }),

  ])),
  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('MovimentoCaixas', 'referencia', { transaction: t }),
  ])),
};
