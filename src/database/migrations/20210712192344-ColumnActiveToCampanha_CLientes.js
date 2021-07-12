module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('Campanhas_Clientes', 'ativo', {
      allowNull: false,
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: true,
    }, { transaction: t }),
  ])),
  down: (queryInterface) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('Campanhas_Clientes', 'ativo', { transaction: t }),
  ])),
};
