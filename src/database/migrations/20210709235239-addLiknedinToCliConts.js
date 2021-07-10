module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('CliConts', 'linkedin', {
      allowNull: true,
      type: Sequelize.DataTypes.STRING,
    }, { transaction: t }),
  ])),
  down: (queryInterface) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('CliConts', 'linkedin', { transaction: t }),
  ])),
};
