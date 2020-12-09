module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Segmentos', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    EmpresaId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Empresas',
        key: 'id',
      },
    },
    UndNegId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'UndNegs',
        key: 'id',
      },
    },
    ProdutoId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Produtos',
        key: 'id',
      },
    },
    AreaId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Areas',
        key: 'id',
      },
    },
    descSegmt: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('Segmentos'),
};
