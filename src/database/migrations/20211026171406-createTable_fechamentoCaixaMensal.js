module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('FechamentoCaixaMensals', {
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
    saldoMes: {
      allowNull: false,
      type: Sequelize.FLOAT,
    },
    entrada: {
      allowNull: false,
      type: Sequelize.FLOAT,
    },
    saida: {
      allowNull: true,
      type: Sequelize.FLOAT,
    },
    periodo: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    ano: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('FechamentoCaixaMensals'),
};
