module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Parcelas', {
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
    OportunidadeId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Oportunidades',
        key: 'id',
      },
    },
    parcela: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    vlrParcela: {
      allowNull: false,
      type: Sequelize.NUMERIC,
    },
    dtEmissao: {
      allowNull: true,
      type: Sequelize.DATEONLY,
    },
    dtVencimento: {
      allowNull: true,
      type: Sequelize.DATEONLY,
    },
    notaFiscal: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    pedidoCliente: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    situacao: {
      allowNull: true,
      type: Sequelize.NUMERIC,
      defaultValue: 1,
    },
    dtLiquidacao: {
      allowNull: true,
      type: Sequelize.DATEONLY,
    },
    vlrPago: {
      allowNull: true,
      type: Sequelize.NUMERIC,
    },
    saldo: {
      type: Sequelize.STRING,
      allowNull: true,
    },

  }),

  down: (queryInterface) => queryInterface.dropTable('Parcelas'),
};

/*
parcela
vlrParcela
dtEmissao
dtVencimento
notaFiscal
pedidoCliente
situacao
dtLiquidacao
vlrPago
saldo
*/
