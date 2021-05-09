module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('Users', 'AvatarId', {
      allowNull: true,
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: 'Avatars',
        key: 'id',
      },
    }, { transaction: t }),
  ])),
  down: (queryInterface) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('Users', 'AvatarId', { transaction: t }),
  ])),
};
