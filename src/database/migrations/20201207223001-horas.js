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
    dataAtivd: {
      allowNull: false,
      type: Sequelize.DATEONLY,
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
      type: Sequelize.INTEGER,
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
    dataAtivdAudit: {
      allowNull: true,
      type: Sequelize.DATE,
    },
    totalApontAudit: {
      allowNull: true,
      type: Sequelize.INTEGER,
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
