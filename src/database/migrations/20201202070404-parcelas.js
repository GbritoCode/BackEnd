module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('parcelas', {

    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER,
    },
    oportunidadeId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'oportunidades',
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
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },

  }),

  down: (queryInterface) => queryInterface.dropTable('parcelas'),
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
