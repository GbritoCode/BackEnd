module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('Users', 'allowedClients',
      {
        type: Sequelize.STRING,
      });
    queryInterface.addColumn('Users', 'mainClient',
      {
        type: Sequelize.STRING,
      });
    queryInterface.addColumn('Users', 'isColab',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Users', 'allowedClients');
    queryInterface.removeColumn('Users', 'mainClient');
    queryInterface.removeColumn('Users', 'isColab');
  },
};
