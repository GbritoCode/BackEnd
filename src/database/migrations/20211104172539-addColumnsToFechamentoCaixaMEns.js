module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('FechamentoCaixaMensals', 'entradaPrev', {
      allowNull: false,
      defaultValue: 0,
      type: Sequelize.DataTypes.FLOAT,
    }, { transaction: t }),

    queryInterface.addColumn('FechamentoCaixaMensals', 'saidaPrev', {
      allowNull: false,
      defaultValue: 0,
      type: Sequelize.DataTypes.FLOAT,
    }, { transaction: t }),

    queryInterface.addColumn('FechamentoCaixaMensals', 'saldoMesPrev', {
      allowNull: false,
      defaultValue: 0,
      type: Sequelize.DataTypes.FLOAT,
    }, { transaction: t }),

  ])),
  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('FechamentoCaixaMensals', 'entradaPrev', { transaction: t }),
    queryInterface.removeColumn('FechamentoCaixaMensals', 'saidaPrev', { transaction: t }),
    queryInterface.removeColumn('FechamentoCaixaMensals', 'saldoMesPrev', { transaction: t }),
  ])),
};
