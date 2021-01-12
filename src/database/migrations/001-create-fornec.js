module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Fornecs', {
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

    EmpresaId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Empresas',
        key: 'id',
      },
    },
    CondPgmtoId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'CondPgmtos',
        key: 'id',
      },
    },
    CNPJ: {
      allowNull: false,
      unique: true,
      type: Sequelize.STRING,
    },
    nome: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    nomeConta: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    fone: {
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
    complemento: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    bairro: {
      allowNull: true,
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
    banco: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    agencia: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    conta: {
      allowNull: false,
      type: Sequelize.STRING,
    },

  }),

  down: (queryInterface) => queryInterface.dropTable('Fornecs'),
};
