module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Campanhas_Clientes', {
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    deletedAt: {
      type: Sequelize.DATE,
    },
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    CampanhaId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Campanhas',
        key: 'id',
      },
    },
    ClienteId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Clientes',
        key: 'id',
      },
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('Campanhas_Clientes'),
};
