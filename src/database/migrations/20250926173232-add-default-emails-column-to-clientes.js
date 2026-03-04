module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('Clientes', 'emailsCot',
      {
        type: Sequelize.TEXT,
      });
    queryInterface.addColumn('Clientes', 'emailsParc',
      {
        type: Sequelize.TEXT,
      });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Clientes', 'emailsCot');
    queryInterface.removeColumn('Clientes', 'emailsParc');
  },
};
