module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('RecDesps', {
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
    desc: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    recDesp: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    tipoItem: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    contaContabil: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    centCusto: {
      allowNull: false,
      type: Sequelize.STRING,
    },

  }),

  down: (queryInterface) => queryInterface.dropTable('RecDesps'),
};
