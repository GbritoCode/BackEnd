module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('FollowUps', 'CampanhasId', {
      allowNull: true,
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: 'Campanhas',
        key: 'id',
      },
    }, { transaction: t }),
  ])),
  down: (queryInterface) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('FollowUps', 'CampanhasId', { transaction: t }),
  ])),
};
