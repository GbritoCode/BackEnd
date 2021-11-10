module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('MovimentoCaixas', 'recDesp', {
      allowNull: false,
      defaultValue: 'error',
      type: Sequelize.DataTypes.STRING,

    }, { transaction: t }),

  ])),
  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('MovimentoCaixas', 'recDesp', { transaction: t }),
  ])),
};
