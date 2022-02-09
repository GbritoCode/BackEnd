module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('Clientes', 'atvPrincipal', {
      type: Sequelize.STRING(1000),
      allowNull: true,
    }, { transaction: t }),

  ])),
  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('Clientes', 'atvPrincipal', { transaction: t }),
  ])),
};
