module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('CentroCustos', {
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
    EmpresaId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Empresas',
        key: 'id',
      },
    },
    cod: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    desc: {
      allowNull: false,
      type: Sequelize.STRING,
    },

  }),

  down: (queryInterface) => queryInterface.dropTable('CentroCustos'),
};
