module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('Representantes', 'ColabId', {
      allowNull: true,
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: 'Colabs',
        key: 'id',
      },
    }, { transaction: t }),
  ])),
  down: (queryInterface) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('Representantes', 'ColabId', { transaction: t }),
  ])),
};
