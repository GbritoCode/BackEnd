module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('EmailHists', {
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
    copias: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    file: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    tipo: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    idAux: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('EmailHists'),
};
