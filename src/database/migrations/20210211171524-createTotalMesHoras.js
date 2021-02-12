module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ResultPeriodos', {
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
    ColabId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Colabs',
        key: 'id',
      },
    },
    totalHrs: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    totalDesp: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    totalReceb: {
      allowNull: false,
      type: Sequelize.STRING,
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

  down: (queryInterface) => queryInterface.dropTable('ResultPeriodos'),
};
