module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('Colabs', 'recebeFixo', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }, { transaction: t }),
    queryInterface.addColumn('Colabs', 'vlrFixo', {
      type: Sequelize.FLOAT,
      allowNull: true,
    }, { transaction: t }),
  ])),
  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('Colabs', 'recebeFixo', { transaction: t }),
    queryInterface.removeColumn('Colabs', 'vlrFixo', { transaction: t }),
  ])),
};
