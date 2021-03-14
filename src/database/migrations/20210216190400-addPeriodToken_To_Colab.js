module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('Colabs', 'PeriodToken', {
      allowNull: true,
      type: Sequelize.DataTypes.STRING(500),
    }, { transaction: t }),
  ])),
  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('Colabs', 'PeriodToken', { transaction: t }),
  ])),
};
