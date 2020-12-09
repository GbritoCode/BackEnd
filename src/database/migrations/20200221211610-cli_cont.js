module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('CliConts', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    ClienteId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Clientes',
        key: 'id',
      },
    },
    nome: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    cel: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    fone: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    skype: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    email: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    aniver: {
      allowNull: true,
      type: Sequelize.DATEONLY,
    },
    tipoConta: {
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

  down: (queryInterface) => queryInterface.dropTable('CliConts'),
};
