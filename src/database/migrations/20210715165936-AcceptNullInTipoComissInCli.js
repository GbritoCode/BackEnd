module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.changeColumn('Clientes', 'TipoComisseId', {
      type: Sequelize.INTEGER,
      allowNull: true,
    }, { transaction: t }),
  ])),
  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.changeColumn('Clientes', 'TipoComisseId', {
      allowNull: true,
      type: Sequelize.INTEGER,
      references: {
        model: 'TipoComisses',
        key: 'id',
      },

    }, { transaction: t }),
  ])),
};
