module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('FollowUps', 'ativo', {
      allowNull: false,
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: true,
    }, { transaction: t }),
  ])),
  down: (queryInterface) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('FollowUps', 'ativo', { transaction: t }),
  ])),
};
