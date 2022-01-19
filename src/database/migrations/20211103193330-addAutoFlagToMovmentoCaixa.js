module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('MovimentoCaixas', 'autoCreated', {
      allowNull: false,
      defaultValue: false,
      type: Sequelize.DataTypes.BOOLEAN,

    }, { transaction: t }),

  ])),
  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('MovimentoCaixas', 'autoCreated', { transaction: t }),
  ])),
};
