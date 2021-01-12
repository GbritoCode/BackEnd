module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Empresas', {
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
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER,
    },
    UserId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
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
  }),

  down: (queryInterface) => queryInterface.dropTable('Empresas'),
};
