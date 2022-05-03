module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.changeColumn('ResultPeriodos', 'totalHrs', {
      type: Sequelize.FLOAT,
      allowNull: false,
    }, { transaction: t }),

    queryInterface.changeColumn('ResultPeriodos', 'totalDesp', {
      type: Sequelize.FLOAT,
      allowNull: false,
    }, { transaction: t }),

    queryInterface.changeColumn('ResultPeriodos', 'totalReceb', {
      type: Sequelize.FLOAT,
      allowNull: false,
    }, { transaction: t }),

  ])),
  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.changeColumn('ResultPeriodos', 'totalHrs', {
      type: Sequelize.INTEGER,
      allowNull: false,
    }, { transaction: t }),

    queryInterface.changeColumn('ResultPeriodos', 'totalDesp', {
      type: Sequelize.INTEGER,
      allowNull: false,
    }, { transaction: t }),

    queryInterface.changeColumn('ResultPeriodos', 'totalReceb', {
      type: Sequelize.INTEGER,
      allowNull: false,
    }, { transaction: t }),

  ])),
};
