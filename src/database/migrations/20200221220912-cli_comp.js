module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('cliComps', {
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
        model: 'clientes',
        key: 'id',
      },
    },
    CondPgmtoId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'condPgmtos',
        key: 'id',
      },
    },
    fantasia: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    rzSocial: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    nomeAbv: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    cep: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    rua: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    numero: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    bairro: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    cidade: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    uf: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    inscMun: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    inscEst: {
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

  down: (queryInterface) => queryInterface.dropTable('cliComps'),
};
