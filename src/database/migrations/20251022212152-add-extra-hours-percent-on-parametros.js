module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('Parametros', 'limitExtraHoursPercentInPackageOport',
      {
        type: Sequelize.TEXT,
      });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Parametros', 'limitExtraHoursPercentInPackageOport');
  },
};
