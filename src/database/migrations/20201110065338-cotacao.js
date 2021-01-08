module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Cotacaos', {
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
    OportunidadeId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Oportunidades',
        key: 'id',
      },
    },
    probVend: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    tipoCobranca: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    hrsPrevst: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    vlrProp: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    vlrDesc: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    vlrLiq: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    recLiq: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    prevLucro: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    numParcelas: {
      allowNull: false,
      type: Sequelize.INTEGER,
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
    deletedAt: {
      type: Sequelize.DATE,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('Cotacaos'),
};
