module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ColabComps', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    ColabId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Colabs',
        key: 'id',
      },
    },
    nivel: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    tipoValor: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    valor: {
      allowNull: false,
      type: Sequelize.NUMERIC,
    },
    dataInic: {
      allowNull: false,
      type: Sequelize.DATEONLY,
    },
    dataFim: {
      allowNull: false,
      type: Sequelize.DATEONLY,
    },
    tipoAtend: {
      allowNull: false,
      type: Sequelize.INTEGER,
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

  down: (queryInterface) => queryInterface.dropTable('ColabComps'),
};
