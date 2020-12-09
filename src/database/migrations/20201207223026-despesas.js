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
      type: Sequelize.DATE,
    },
    tipoDespesa: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    valorDespesa: {
      allowNull: false,
      type: Sequelize.DATE,
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

  down: (queryInterface) => queryInterface.dropTable('Despesas'),
};
