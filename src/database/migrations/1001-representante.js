module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Representantes', {
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
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('Representantes'),
};
