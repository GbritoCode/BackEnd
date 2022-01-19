module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('Recursos', 'colabVlrHrAux', {
      type: Sequelize.FLOAT,
      allowNull: true,
    }, { transaction: t }),
    queryInterface.addColumn('Recursos', 'custoPrevAux', {
      type: Sequelize.FLOAT,
      allowNull: true,
    }, { transaction: t }),
  ])),
  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('Recursos', 'colabVlrHrAux', { transaction: t }),
    queryInterface.removeColumn('Recursos', 'custoPrevAux', { transaction: t }),
  ])),
};
