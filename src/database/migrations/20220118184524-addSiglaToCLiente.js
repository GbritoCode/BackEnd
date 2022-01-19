module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('Clientes', 'sigla', {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
    }, { transaction: t }),
  ])),
  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('Clientes', 'sigla', { transaction: t }),
  ])),
};
