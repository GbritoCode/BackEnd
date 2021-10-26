module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('Parametros', 'compHrs', {
      allowNull: true,
      type: Sequelize.DataTypes.INTEGER,
      defaultValues: 0,
    }, { transaction: t }),
  ])),
  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('Parametros', 'compHrs', { transaction: t }),
  ])),
};
