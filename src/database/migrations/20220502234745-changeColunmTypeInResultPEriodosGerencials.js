module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.changeColumn('ResultPeriodoGerencials', 'totalHrs', {
      type: Sequelize.FLOAT,
      allowNull: false,
    }, { transaction: t }),

    queryInterface.changeColumn('ResultPeriodoGerencials', 'totalDesp', {
      type: Sequelize.FLOAT,
      allowNull: false,
    }, { transaction: t }),

    queryInterface.changeColumn('ResultPeriodoGerencials', 'totalReceb', {
      type: Sequelize.FLOAT,
      allowNull: false,
    }, { transaction: t }),

  ])),
  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.changeColumn('ResultPeriodoGerencials', 'totalHrs', {
      type: Sequelize.INTEGER,
      allowNull: false,
    }, { transaction: t }),

    queryInterface.changeColumn('ResultPeriodoGerencials', 'totalDesp', {
      type: Sequelize.INTEGER,
      allowNull: false,
    }, { transaction: t }),

    queryInterface.changeColumn('ResultPeriodoGerencials', 'totalReceb', {
      type: Sequelize.INTEGER,
      allowNull: false,
    }, { transaction: t }),

  ])),
};
