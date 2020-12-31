module.exports = {
  up: (queryInterface) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('Parametros', 'impostos', { transaction: t }),
  ])),

  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('Parametros', 'impostos', {
      allowNull: false,
      type: Sequelize.DataTypes.INTEGER,
    }, { transaction: t }),
  ])),
};
