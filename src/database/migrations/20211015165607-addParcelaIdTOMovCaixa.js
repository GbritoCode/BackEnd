module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('MovimentoCaixas', 'ParcelaId', {
      allowNull: true,
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: 'Parcelas',
        key: 'id',
      },
    }, { transaction: t }),
    queryInterface.addColumn('MovimentoCaixas', 'vlrPago', {
      allowNull: true,
      type: Sequelize.DataTypes.FLOAT,
    }, { transaction: t }),
    queryInterface.addColumn('MovimentoCaixas', 'saldo', {
      allowNull: true,
      type: Sequelize.DataTypes.FLOAT,
    }, { transaction: t }),
  ])),
  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('MovimentoCaixas', 'ParcelaId', { transaction: t }),
    queryInterface.removeColumn('MovimentoCaixas', 'vlrPago', { transaction: t }),
    queryInterface.removeColumn('MovimentoCaixas', 'saldo', { transaction: t }),
  ])),
};
