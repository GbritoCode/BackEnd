module.exports = {
  up: (queryInterface) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('CotacaoFiles', 'EmpresaId', { transaction: t }),

  ])),
  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([

    queryInterface.addColumn('CotacaoFiles', 'EmpresaId', {
      allowNull: true,
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: 'Empresas',
        key: 'id',
      },
    }, { transaction: t }),
  ])),
};
