module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.changeColumn('Parcelas', 'situacao', {
      type: Sequelize.DataTypes.INTEGER,
      defaultValue: 1,
    }, { transaction: t }),
  ])),

  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.changeColumn('Parcelas', 'situacao', {
      type: Sequelize.DataTypes.INTEGER,
    }, { transaction: t }),
  ])),
};
