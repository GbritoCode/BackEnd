module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('Despesas', 'RecDespId', {
      allowNull: true,
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: 'RecDesps',
        key: 'id',
      },
    }, { transaction: t }),
  ])),
  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('Despesas', 'RecDespId', { transaction: t }),
  ])),
};
