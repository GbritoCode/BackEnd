module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('empresas', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER,
    },
    UserId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    idFederal: {
      allowNull: false,
      unique: true,
      type: Sequelize.STRING,
    },
    nome: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    license: {
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

  down: (queryInterface) => queryInterface.dropTable('empresas'),
};
