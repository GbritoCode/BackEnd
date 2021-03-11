module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ResultPeriodoGerencials', {
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
    totalHrs: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    totalDesp: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    totalReceb: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    periodo: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    ano: {
      allowNull: false,
      type: Sequelize.STRING,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('ResultPeriodoGerencials'),
};
