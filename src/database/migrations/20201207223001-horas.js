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
      type: Sequelize.DATE,
    },
    horaIntrv: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    horaFim: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    dataLancamento: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    totalApont: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    totalAcum: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    horaInicAudit: {
      allowNull: true,
      type: Sequelize.DATE,
    },
    horaIntrvAudit: {
      allowNull: true,
      type: Sequelize.DATE,
    },
    horaFimAudit: {
      allowNull: true,
      type: Sequelize.DATE,
    },
    dataLancamentoAudit: {
      allowNull: true,
      type: Sequelize.DATE,
    },
    totalApontAudit: {
      allowNull: true,
      type: Sequelize.DATE,
    },
    totalAcumAudit: {
      allowNull: true,
      type: Sequelize.DATE,
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
