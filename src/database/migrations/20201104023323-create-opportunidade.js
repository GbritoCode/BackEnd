module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Oportunidades', {
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
    UndNegId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'UndNegs',
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
    SegmentoId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Segmentos',
        key: 'id',
      },
    },
    RepresentanteId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Representantes',
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
      type: Sequelize.INTEGER,
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
    totalHoras: {
      allowNull: true,
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },

  }),

  down: (queryInterface) => queryInterface.dropTable('Oportunidades'),
};
