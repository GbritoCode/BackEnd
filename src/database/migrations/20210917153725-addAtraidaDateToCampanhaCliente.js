module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('Campanhas_Clientes', 'atraida', {
      allowNull: true,
      type: Sequelize.DataTypes.DATEONLY,
    }, { transaction: t }),
  ])),
  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('Campanhas_Clientes', 'atraida', { transaction: t }),
  ])),
};
