module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('FechamentoPeriodos', {
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
    nome: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    ano: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    dataInic: {
      allowNull: false,
      type: Sequelize.DATEONLY,
    },
    dataFim: {
      allowNull: false,
      type: Sequelize.DATEONLY,
    },
    aberto: {
      allowNull: false,
      type: Sequelize.BOOLEAN,
    },

  }),

  down: (queryInterface) => queryInterface.dropTable('FechamentoPeriodos'),
};
