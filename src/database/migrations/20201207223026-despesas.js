module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Despesas', {
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
    dataDespesa: {
      allowNull: false,
      type: Sequelize.DATEONLY,
    },
    tipoDespesa: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    valorDespesa: {
      allowNull: false,
      type: Sequelize.INTEGER,
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

  down: (queryInterface) => queryInterface.dropTable('Despesas'),
};
