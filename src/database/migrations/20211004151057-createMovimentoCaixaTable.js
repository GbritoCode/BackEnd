module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('MovimentoCaixas', {
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
    RecDespId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'RecDesps',
        key: 'id',
      },
    },
    ColabCreate: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Colabs',
        key: 'id',
      },
    },
    ColabLiqui: {
      allowNull: true,
      type: Sequelize.INTEGER,
      references: {
        model: 'Colabs',
        key: 'id',
      },
    },
    FornecId: {
      allowNull: true,
      type: Sequelize.INTEGER,
      references: {
        model: 'Fornecs',
        key: 'id',
      },
    },
    ClienteId: {
      allowNull: true,
      type: Sequelize.INTEGER,
      references: {
        model: 'Clientes',
        key: 'id',
      },
    },
    valor: {
      allowNull: false,
      type: Sequelize.FLOAT,
    },
    dtVenc: {
      allowNull: false,
      type: Sequelize.DATEONLY,
    },
    dtLiqui: {
      allowNull: true,
      type: Sequelize.DATEONLY,
    },
    status: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('MovimentoCaixas'),
};
