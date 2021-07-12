module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('FollowUps', 'proxPasso', {
      allowNull: true,
      type: Sequelize.DataTypes.INTEGER,
    }, { transaction: t }),
    queryInterface.addColumn('FollowUps', 'prefContato', {
      allowNull: true,
      type: Sequelize.DataTypes.INTEGER,
    }, { transaction: t }),
  ])),
  down: (queryInterface) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('FollowUps', 'prefContato', { transaction: t }),
    queryInterface.removeColumn('FollowUps', 'proxPasso', { transaction: t }),
  ])),
};
