module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('Clientes', 'CampanhasId', { transaction: t }),
    queryInterface.addColumn('Clientes', 'CampanhaId', {
      allowNull: true,
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: 'Campanhas',
        key: 'id',
      },
    }, { transaction: t }),
  ])),
  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('Clientes', 'CampanhasId', {
      allowNull: true,
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: 'Campanhas',
        key: 'id',
      },
    }, { transaction: t }),
    queryInterface.removeColumn('Clientes', 'CampanhaId', { transaction: t }),
  ])),
};
