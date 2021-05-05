module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ParcelaFiles', {
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
    ParcelaId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Parcelas',
        key: 'id',
      },
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('ParcelaFiles'),
};
