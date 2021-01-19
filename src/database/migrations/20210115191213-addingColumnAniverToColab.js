module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('Colabs', 'aniver', {
      allowNull: true,
      type: Sequelize.DataTypes.DATEONLY,
    }, { transaction: t }),
  ])),
  down: (queryInterface) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('Colabs', 'aniver', { transaction: t })])),
};
