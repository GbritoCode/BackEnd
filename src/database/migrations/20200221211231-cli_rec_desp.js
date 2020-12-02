module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('cliRecDesps', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    clienteId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'clientes',
        key: 'id',
      },
    },
    recDespId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'recDesps',
        key: 'id',
      },
    },
    tipoCobranca: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    valorRec: {
      allowNull: false,
      type: Sequelize.REAL,
    },
    dataInic: {
      allowNull: false,
      type: Sequelize.DATEONLY,
    },
    dataFim: {
      allowNull: false,
      type: Sequelize.DATEONLY,
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

  down: (queryInterface) => queryInterface.dropTable('cliRecDesps'),
};
