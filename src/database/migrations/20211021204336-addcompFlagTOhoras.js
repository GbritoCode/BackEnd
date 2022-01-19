module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('Horas', 'compFlag', {
      allowNull: false,
      defaultValue: 0,
      type: Sequelize.DataTypes.INTEGER,

    }, { transaction: t }),
  ])),
  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('Horas', 'compFlag', { transaction: t }),
  ])),
};
