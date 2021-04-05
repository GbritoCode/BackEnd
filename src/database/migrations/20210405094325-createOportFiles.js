module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('CotacaoFiles', {
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
    nome: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    path: {
      allowNull: false,
      type: Sequelize.STRING,
    },

  }),

  down: (queryInterface) => queryInterface.dropTable('CotacaoFiles'),
};
