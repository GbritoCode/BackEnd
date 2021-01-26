module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('RecDesps', 'ContaContabilId', {
      allowNull: true,
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: 'ContaContabils',
        key: 'id',
      },
    }, { transaction: t }),
    queryInterface.addColumn('RecDesps', 'CentroCustoId', {
      allowNull: true,
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: 'CentroCustos',
        key: 'id',
      },
    }, { transaction: t }),
    queryInterface.removeColumn('RecDesps', 'contaContabil', { transaction: t }),
    queryInterface.removeColumn('RecDesps', 'centCusto', { transaction: t }),

  ])),
  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('RecDesps', 'ContaContabilId', { transaction: t }),
    queryInterface.removeColumn('RecDesps', 'CentroCustoId', { transaction: t }),
    queryInterface.addColumn('RecDesps', 'contaContabil', {
      allowNull: true,
      type: Sequelize.DataTypes.STRING,
    }, { transaction: t }),
    queryInterface.addColumn('RecDesps', 'centCusto', {
      allowNull: true,
      type: Sequelize.DataTypes.STRING,
    }, { transaction: t }),
  ])),
};
