module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('Campanhas_Clientes', 'reuniaoAgend', {
      allowNull: true,
      type: Sequelize.DataTypes.DATE,
    }, { transaction: t }),
    queryInterface.addColumn('Campanhas_Clientes', 'orcamentoSolict', {
      allowNull: true,
      type: Sequelize.DataTypes.DATE,
    }, { transaction: t }),
    queryInterface.addColumn('Campanhas_Clientes', 'efetivacao', {
      allowNull: true,
      type: Sequelize.DataTypes.DATE,
    }, { transaction: t }),
  ])),
  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('Campanhas_Clientes', 'reuniaoAgend', { transaction: t }),
    queryInterface.removeColumn('Campanhas_Clientes', 'orcamentoSolict', { transaction: t }),
    queryInterface.removeColumn('Campanhas_Clientes', 'efetivacao', { transaction: t }),
  ])),
};
