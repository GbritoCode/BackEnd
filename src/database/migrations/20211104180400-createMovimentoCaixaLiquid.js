module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('LiquidMovCaixas', {
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
    MovimentoCaixaId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'MovimentoCaixas',
        key: 'id',
      },
    },
    valor: {
      allowNull: false,
      type: Sequelize.FLOAT,
    },
    dtLiqui: {
      allowNull: true,
      type: Sequelize.DATEONLY,
    },
    recDesp: {
      allowNull: false,
      defaultValue: 'Error',
      type: Sequelize.STRING,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('LiquidMovCaixas'),
};
