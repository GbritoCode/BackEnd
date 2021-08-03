module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('Clientes', 'erp', {
      allowNull: true,
      type: Sequelize.DataTypes.STRING,
    }, { transaction: t }),
    queryInterface.addColumn('Clientes', 'database', {
      allowNull: true,
      type: Sequelize.DataTypes.STRING,
    }, { transaction: t }),
    queryInterface.addColumn('Clientes', 'ramo', {
      allowNull: true,
      type: Sequelize.DataTypes.STRING,
    }, { transaction: t }),
    queryInterface.addColumn('Clientes', 'setor', {
      allowNull: true,
      type: Sequelize.DataTypes.STRING,
    }, { transaction: t }),
    queryInterface.addColumn('Clientes', 'qtdFuncionarios', {
      allowNull: true,
      type: Sequelize.DataTypes.STRING,
    }, { transaction: t }),
    queryInterface.removeColumn('Clientes', 'CustomField1', { transaction: t }),
    queryInterface.removeColumn('Clientes', 'CustomField2', { transaction: t }),
    queryInterface.removeColumn('Clientes', 'CustomField3', { transaction: t }),
    queryInterface.removeColumn('Clientes', 'CustomField4', { transaction: t }),
    queryInterface.removeColumn('Clientes', 'CustomField5', { transaction: t }),
  ])),
  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('Clientes', 'erp', { transaction: t }),
    queryInterface.removeColumn('Clientes', 'database', { transaction: t }),
    queryInterface.removeColumn('Clientes', 'ramo', { transaction: t }),
    queryInterface.removeColumn('Clientes', 'setor', { transaction: t }),
    queryInterface.removeColumn('Clientes', 'qtdFuncionarios', { transaction: t }),
    queryInterface.addColumn('Clientes', 'customField1', {
      allowNull: true,
      type: Sequelize.DataTypes.STRING,
    }, { transaction: t }),
    queryInterface.addColumn('Clientes', 'customField2', {
      allowNull: true,
      type: Sequelize.DataTypes.STRING,
    }, { transaction: t }),
    queryInterface.addColumn('Clientes', 'customField3', {
      allowNull: true,
      type: Sequelize.DataTypes.STRING,
    }, { transaction: t }),
    queryInterface.addColumn('Clientes', 'customField14', {
      allowNull: true,
      type: Sequelize.DataTypes.STRING,
    }, { transaction: t }),
    queryInterface.addColumn('Clientes', 'customField5', {
      allowNull: true,
      type: Sequelize.DataTypes.STRING,
    }, { transaction: t }),
  ])),
};
