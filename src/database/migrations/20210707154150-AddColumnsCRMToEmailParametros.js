module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('ParametrosEmails', 'fromEmailCRM', {
      allowNull: true,
      type: Sequelize.DataTypes.STRING,
    }, { transaction: t }),
    queryInterface.addColumn('ParametrosEmails', 'bccEmailCRM', {
      allowNull: true,
      type: Sequelize.DataTypes.STRING,
    }, { transaction: t }),
  ])),
  down: (queryInterface) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('ParametrosEmails', 'fromEmailCRM', { transaction: t }),
    queryInterface.removeColumn('ParametrosEmails', 'bccEmailCRM', { transaction: t }),
  ])),
};
