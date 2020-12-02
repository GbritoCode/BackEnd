module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('cotacaos', {
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
        model: 'empresas',
        key: 'id',
      },
    },
    oportunidadeId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'oportunidades',
        key: 'id',
      },
    },
    probVend: {
      allowNull: false,
      type: Sequelize.NUMERIC,
    },
    tipoCobranca: {
      allowNull: false,
      type: Sequelize.NUMERIC,
    },
    hrsPrevst: {
      allowNull: false,
      type: Sequelize.NUMERIC,
    },
    vlrProp: {
      allowNull: false,
      type: Sequelize.NUMERIC,
    },
    vlrDesc: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    vlrLiq: {
      allowNull: false,
      type: Sequelize.NUMERIC,
    },
    recLiq: {
      allowNull: false,
      type: Sequelize.NUMERIC,
    },
    prevLucro: {
      allowNull: false,
      type: Sequelize.NUMERIC,
    },
    numParcelas: {
      allowNull: false,
      type: Sequelize.NUMERIC,
    },
    motivo: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    desc: {
      allowNull: true,
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

  down: (queryInterface) => queryInterface.dropTable('cotacaos'),
};
