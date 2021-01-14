module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('Horas', 'RecursoId', {
      allowNull: false,
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: 'Recursos',
        key: 'id',
      },
    }, { transaction: t }),
  ])),
  down: (queryInterface) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('Horas', 'RecursoId', { transaction: t })])),
};
