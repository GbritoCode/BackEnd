module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.changeColumn('Horas', 'desc', {
      type: Sequelize.DataTypes.STRING(500),
    }, { transaction: t }),
  ])),

  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.changeColumn('Horas', 'desc', {
      type: Sequelize.DataTypes.STRING,
    }, { transaction: t }),

  ])),
};
