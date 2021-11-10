module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('Parametros', 'pgmtoVenc', {
      allowNull: true,
      type: Sequelize.DataTypes.INTEGER,
    }, { transaction: t }),
  ])),
  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('Parametros', 'pgmtoVenc', { transaction: t }),
  ])),
};
