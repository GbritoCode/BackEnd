module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('Users', 'isFirstLogin', {
      allowNull: false,
      defaultValue: true,
      type: Sequelize.DataTypes.BOOLEAN,
    }, { transaction: t }),
  ])),
  down: (queryInterface) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('Users', 'isFirstLogin', { transaction: t })])),
};
