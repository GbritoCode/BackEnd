module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.changeColumn('CliConts', 'skype', {
      type: Sequelize.STRING,
      allowNull: true,
    }, { transaction: t }),
  ])),
  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.changeColumn('CliConts', 'skype', {
      allowNull: true,
      type: Sequelize.STRING,

    }, { transaction: t }),
  ])),
};
