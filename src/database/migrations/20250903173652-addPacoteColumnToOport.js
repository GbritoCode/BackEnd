module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('Oportunidades', 'pacote',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Oportunidades', 'pacote');
  },
};
