module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Horas', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER,
    },
    OportunidadeId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Oportunidades',
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
    horaInic: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    horaIntrv: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    horaFim: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    dataLancamento: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    totalApont: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    horaInicAudit: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    horaIntrvAudit: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    horaFimAudit: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    dataLancamentoAudit: {
      allowNull: true,
      type: Sequelize.DATE,
    },
    totalApontAudit: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    solicitante: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    AreaId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Areas',
        key: 'id',
      },
    },
    desc: {
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

  down: (queryInterface) => queryInterface.dropTable('Horas'),
};
