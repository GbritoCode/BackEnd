module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('MovimentoCaixas', 'ano', {
      allowNull: true,
      type: Sequelize.DataTypes.INTEGER,

    }, { transaction: t }),
    queryInterface.addColumn('MovimentoCaixas', 'periodo', {
      allowNull: true,
      type: Sequelize.DataTypes.STRING,

    }, { transaction: t }),
  ])),
  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('MovimentoCaixas', 'ano', { transaction: t }),
    queryInterface.removeColumn('MovimentoCaixas', 'periodo', { transaction: t }),
  ])),
};
