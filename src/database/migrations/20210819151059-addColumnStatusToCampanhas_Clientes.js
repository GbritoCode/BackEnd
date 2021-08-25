module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('Campanhas_Clientes', 'dataFim', {
      allowNull: true,
      type: Sequelize.DataTypes.DATEONLY,
    }, { transaction: t }),
    queryInterface.addColumn('Campanhas_Clientes', 'status', {
      allowNull: true,
      type: Sequelize.DataTypes.STRING,
      defaultValue: 'Mapeada',
    }, { transaction: t }),

  ])),
  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('Campanhas_Clientes', 'dataFim', { transaction: t }),
    queryInterface.removeColumn('Campanhas_Clientes', 'status', { transaction: t }),
  ])),
};
