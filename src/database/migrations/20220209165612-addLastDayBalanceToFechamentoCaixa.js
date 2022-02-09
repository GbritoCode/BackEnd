module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('FechamentoCaixaMensals', 'saldoLastDay', {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 0,
    }, { transaction: t }),
    queryInterface.addColumn('FechamentoCaixaMensals', 'recLastDay', {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 0,
    }, { transaction: t }),
    queryInterface.addColumn('FechamentoCaixaMensals', 'despLastDay', {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 0,
    }, { transaction: t }),
  ])),
  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('FechamentoCaixaMensals', 'saldoLastDay', { transaction: t }),
    queryInterface.removeColumn('FechamentoCaixaMensals', 'recLastDay', { transaction: t }),
    queryInterface.removeColumn('FechamentoCaixaMensals', 'despLastDay', { transaction: t }),
  ])),
};
