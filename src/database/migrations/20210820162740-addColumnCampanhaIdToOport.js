module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('Oportunidades', 'CampanhaId', {
      allowNull: true,
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: 'Campanhas',
        key: 'id',
      },
    }, { transaction: t }),

  ])),
  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('Oportunidades', 'CampanhaId', { transaction: t }),
  ])),
};
