module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.changeColumn('Perfils', 'permittedPages', {
      allowNull: true,
      type: Sequelize.DataTypes.STRING(1000),

    }, { transaction: t }),
  ])),
  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.changeColumn('Perfils', 'permittedPages', {
      allowNull: true,
      type: Sequelize.DataTypes.STRING(500),

    }, { transaction: t }),
  ])),
};
