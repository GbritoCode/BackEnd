module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('CliConts', 'cargo', {
      allowNull: true,
      type: Sequelize.DataTypes.STRING,
    }, { transaction: t }),
    queryInterface.addColumn('CliConts', 'ramal', {
      allowNull: true,
      type: Sequelize.DataTypes.STRING,
    }, { transaction: t }),
    queryInterface.removeColumn('CliConts', 'tipoConta', { transaction: t }),
  ])),
  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('CliConts', 'cargo', { transaction: t }),
    queryInterface.removeColumn('CliConts', 'ramal', { transaction: t }),
    queryInterface.addColumn('CliConts', 'tipoConta', {
      allowNull: false,
      type: Sequelize.DataTypes.STRING,
    }, { transaction: t }),
  ])),
};
