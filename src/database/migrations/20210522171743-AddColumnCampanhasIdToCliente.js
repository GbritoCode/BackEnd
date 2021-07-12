module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('Clientes', 'CampanhasId', {
      allowNull: true,
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: 'Campanhas',
        key: 'id',
      },
    }, { transaction: t }),
    queryInterface.addColumn('Clientes', 'CustomField1', {
      allowNull: true,
      type: Sequelize.DataTypes.STRING,
    }, { transaction: t }),
    queryInterface.addColumn('Clientes', 'CustomField2', {
      allowNull: true,
      type: Sequelize.DataTypes.STRING,
    }, { transaction: t }),
    queryInterface.addColumn('Clientes', 'CustomField3', {
      allowNull: true,
      type: Sequelize.DataTypes.STRING,
    }, { transaction: t }),
    queryInterface.addColumn('Clientes', 'CustomField4', {
      allowNull: true,
      type: Sequelize.DataTypes.STRING,
    }, { transaction: t }),
    queryInterface.addColumn('Clientes', 'CustomField5', {
      allowNull: true,
      type: Sequelize.DataTypes.STRING,
    }, { transaction: t }),
  ])),
  down: (queryInterface) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('Clientes', 'CampanhasId', { transaction: t }),
    queryInterface.removeColumn('Clientes', 'CustomField1', { transaction: t }),
    queryInterface.removeColumn('Clientes', 'CustomField2', { transaction: t }),
    queryInterface.removeColumn('Clientes', 'CustomField3', { transaction: t }),
    queryInterface.removeColumn('Clientes', 'CustomField4', { transaction: t }),
    queryInterface.removeColumn('Clientes', 'CustomField5', { transaction: t }),
  ])),
};
