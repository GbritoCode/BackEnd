module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('FechamentoCaixaMensals', 'periodo', {
      type: Sequelize.INTEGER,
      allowNull: false,
    }, { transaction: t }),
  ])),
  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('FechamentoCaixaMensals', 'periodo', { transaction: t }),
  ])),
};
