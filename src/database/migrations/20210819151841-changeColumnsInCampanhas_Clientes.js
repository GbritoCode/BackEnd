module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.changeColumn('Campanhas_Clientes', 'reuniaoAgend', {
      type: Sequelize.DATEONLY,
    }, { transaction: t }),
    queryInterface.changeColumn('Campanhas_Clientes', 'orcamentoSolict', {
      type: Sequelize.DATEONLY,
    }, { transaction: t }),
    queryInterface.changeColumn('Campanhas_Clientes', 'efetivacao', {
      type: Sequelize.DATEONLY,
    }, { transaction: t }),
  ])),
  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.changeColumn('Campanhas_Clientes', 'reuniaoAgend', {
      type: Sequelize.DATE,
    }, { transaction: t }),
    queryInterface.changeColumn('Campanhas_Clientes', 'orcamentoSolict', {
      type: Sequelize.DATE,
    }, { transaction: t }),
    queryInterface.changeColumn('Campanhas_Clientes', 'efetivacao', {
      type: Sequelize.DATE,
    }, { transaction: t }),
  ])),
};
