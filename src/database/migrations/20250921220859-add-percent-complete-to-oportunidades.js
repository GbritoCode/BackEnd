module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('Oportunidades', 'percentComplete',
      {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Oportunidades', 'percentComplete');
  },
};
