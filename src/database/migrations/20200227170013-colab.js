module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Colabs', {
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
    FornecId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Fornecs',
        key: 'id',
      },
    },
    PerfilId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Perfils',
        key: 'id',
      },
    },
    UserId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    CPF: {
      allowNull: false,
      unique: true,
      type: Sequelize.STRING,
    },
    nome: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    dtAdmiss: {
      allowNull: false,
      type: Sequelize.DATEONLY,
    },
    cel: {
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
    espec: {
      allowNull: false,
      type: Sequelize.STRING,
    },

  }),

  down: (queryInterface) => queryInterface.dropTable('Colabs'),
};
