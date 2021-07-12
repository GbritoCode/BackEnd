module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('FollowUps', {
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
    ColabId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Colabs',
        key: 'id',
      },
    },
    ClienteId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Clientes',
        key: 'id',
      },
    },
    CliContId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'CliConts',
        key: 'id',
      },
    },
    dataContato: {
      allowNull: false,
      type: Sequelize.DATEONLY,
    },
    dataProxContato: {
      allowNull: false,
      type: Sequelize.DATEONLY,
    },
    detalhes: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    reacao: {
      allowNull: false,
      type: Sequelize.STRING,
    },

  }),

  down: (queryInterface) => queryInterface.dropTable('FollowUps'),
};
