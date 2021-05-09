module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('ParcelaFiles', 'size', {
      allowNull: true,
      type: Sequelize.DataTypes.INTEGER,

    }, { transaction: t }),
  ])),
  down: (queryInterface) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('ParcelaFiles', 'size', { transaction: t }),
  ])),
};
