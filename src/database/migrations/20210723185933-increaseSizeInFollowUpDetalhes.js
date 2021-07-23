module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.changeColumn('FollowUps', 'detalhes', {
      allowNull: true,
      type: Sequelize.DataTypes.STRING(1000),

    }, { transaction: t }),
  ])),
  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.changeColumn('FollowUps', 'detalhes', {
      allowNull: true,
      type: Sequelize.DataTypes.STRING,

    }, { transaction: t }),
  ])),
};
