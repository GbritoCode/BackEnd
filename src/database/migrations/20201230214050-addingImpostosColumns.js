module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('Parametros', 'IRPJ', {
      allowNull: false,
      type: Sequelize.DataTypes.INTEGER,
      defaultValue: 0,
    }, { transaction: t }),
    queryInterface.addColumn('Parametros', 'CSLL', {
      allowNull: false,
      type: Sequelize.DataTypes.INTEGER,
      defaultValue: 0,
    }, { transaction: t }),
    queryInterface.addColumn('Parametros', 'COFINS', {
      allowNull: false,
      type: Sequelize.DataTypes.INTEGER,
      defaultValue: 0,
    }, { transaction: t }),
    queryInterface.addColumn('Parametros', 'PIS', {
      allowNull: false,
      type: Sequelize.DataTypes.INTEGER,
      defaultValue: 0,
    }, { transaction: t }),
    queryInterface.addColumn('Parametros', 'INSS', {
      allowNull: false,
      type: Sequelize.DataTypes.INTEGER,
      defaultValue: 0,
    }, { transaction: t }),
    queryInterface.addColumn('Parametros', 'ISS', {
      allowNull: false,
      type: Sequelize.DataTypes.INTEGER,
      defaultValue: 0,
    }, { transaction: t }),
    queryInterface.addColumn('Parametros', 'PSProLabor', {
      allowNull: false,
      type: Sequelize.DataTypes.INTEGER,
      defaultValue: 0,
    }, { transaction: t }),
    queryInterface.addColumn('Parametros', 'IRRFProLabor', {
      allowNull: false,
      type: Sequelize.DataTypes.INTEGER,
      defaultValue: 0,
    }, { transaction: t }),
  ])),
  down: (queryInterface) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('Parametros', 'IRPJ', { transaction: t }),
    queryInterface.removeColumn('Parametros', 'CSLL', { transaction: t }),
    queryInterface.removeColumn('Parametros', 'COFINS', { transaction: t }),
    queryInterface.removeColumn('Parametros', 'PIS', { transaction: t }),
    queryInterface.removeColumn('Parametros', 'INSS', { transaction: t }),
    queryInterface.removeColumn('Parametros', 'ISS', { transaction: t }),
    queryInterface.removeColumn('Parametros', 'PSProLabor', { transaction: t }),
    queryInterface.removeColumn('Parametros', 'IRRFProLabor', { transaction: t })])),
};
