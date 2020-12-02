module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('recursos', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER,
    },
    oportunidadeId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'oportunidades',
        key: 'id',
      },
    },
    colabId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'colabs',
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
  }),

  down: (queryInterface) => queryInterface.dropTable('recursos'),
};
