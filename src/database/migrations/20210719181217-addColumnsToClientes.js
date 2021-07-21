module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('Clientes', 'fone', {
      allowNull: true,
      type: Sequelize.DataTypes.STRING,
    }, { transaction: t }),
    queryInterface.addColumn('Clientes', 'site', {
      allowNull: true,
      type: Sequelize.DataTypes.STRING,
    }, { transaction: t }),
  ])),
  down: (queryInterface) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('Clientes', 'fone', { transaction: t }),
    queryInterface.removeColumn('Clientes', 'site', { transaction: t }),
  ])),
};
