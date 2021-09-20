module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('Clientes', 'atvPrincipal', {
      allowNull: true,
      type: Sequelize.DataTypes.STRING,
    }, { transaction: t }),

  ])),
  down: (queryInterface) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('Clientes', 'atvPrincipal', { transaction: t }),
  ])),
};
