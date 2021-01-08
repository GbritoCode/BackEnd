module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Recursos', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER,
    },
    OportunidadeId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Oportunidades',
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
    custoPrev: {
      allowNull: false,
      type: Sequelize.NUMERIC,
    },
    dataInclusao: {
      allowNull: false,
      type: Sequelize.DATEONLY,
    },
    hrsPrevst: {
      allowNull: false,
      type: Sequelize.NUMERIC,
    },
    colabVlrHr: {
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
    deletedAt: {
      type: Sequelize.DATE,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('Recursos'),
};
