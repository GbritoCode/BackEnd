module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('FechamentoPeriodos', 'situacao', {
      allowNull: false,
      defaultValue: 'Aberto',
      type: Sequelize.DataTypes.STRING,
    }, { transaction: t }),
    queryInterface.removeColumn('FechamentoPeriodos', 'aberto', { transaction: t }),

  ])),
  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('FechamentoPeriodos', 'situacao', { transaction: t }),
    queryInterface.addColumn('FechamentoPeriodos', 'aberto', {
      allowNull: false,
      defaultValue: true,
      type: Sequelize.DataTypes.BOOLEAN,
    }, { transaction: t }),
  ])),
};
