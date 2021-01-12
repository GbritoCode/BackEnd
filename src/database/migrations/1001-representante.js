module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Representantes', {
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
    TipoComisseId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'TipoComisses',
        key: 'id',
      },
    },
    vlrFixMens: {
      allowNull: false,
      type: Sequelize.NUMERIC,
    },

  }),

  down: (queryInterface) => queryInterface.dropTable('Representantes'),
};
