module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('oportunidades', {
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
        model: 'empresas',
        key: 'id',
      },
    },
    colabId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'colabs',
        key: 'id',
      },
    },
    clienteId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'clientes',
        key: 'id',
      },
    },
    UndNegId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'UndNegs',
        key: 'id',
      },
    },
    itmControleId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'itmControles',
        key: 'id',
      },
    },
    segmentoId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'segmentos',
        key: 'id',
      },
    },
    representanteId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'representantes',
        key: 'id',
      },
    },
    contato: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    data: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    fase: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    cod: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    desc: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    narrativa: {
      type: Sequelize.STRING,
      allowNull: true,
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

  down: (queryInterface) => queryInterface.dropTable('oportunidades'),
};
