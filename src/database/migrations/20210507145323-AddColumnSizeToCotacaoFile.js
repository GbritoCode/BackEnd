module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('CotacaoFiles', 'size', {
      allowNull: true,
      type: Sequelize.DataTypes.INTEGER,

    }, { transaction: t }),
  ])),
  down: (queryInterface) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('CotacaoFiles', 'size', { transaction: t }),
  ])),
};
