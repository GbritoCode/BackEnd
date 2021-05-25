module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('Perfils', 'cod', {
      allowNull: true,
      type: Sequelize.DataTypes.STRING,

    }, { transaction: t }),
    queryInterface.addColumn('Perfils', 'permittedPages', {
      allowNull: true,
      type: Sequelize.DataTypes.STRING(500),

    }, { transaction: t }),
  ])),
  down: (queryInterface) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('Perfils', 'cod', { transaction: t }),
    queryInterface.removeColumn('Perfils', 'permittedPages', { transaction: t }),
  ])),
};
