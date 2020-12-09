module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('CliRecDesps', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    ClienteId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Clientes',
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

  down: (queryInterface) => queryInterface.dropTable('CliRecDesps'),
};
