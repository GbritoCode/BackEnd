module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('Campanhas', 'ColabId', {
      allowNull: true,
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: 'Colabs',
        key: 'id',
      },
    }, { transaction: t }),
    queryInterface.addColumn('Campanhas', 'objetivo', {
      allowNull: true,
      type: Sequelize.DataTypes.STRING,
    }, { transaction: t }),
    queryInterface.addColumn('Campanhas', 'dataInic', {
      allowNull: true,
      type: Sequelize.DataTypes.DATEONLY,
    }, { transaction: t }),
    queryInterface.addColumn('Campanhas', 'dataFim', {
      allowNull: true,
      type: Sequelize.DataTypes.DATEONLY,
    }, { transaction: t }),
  ])),
  down: (queryInterface) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('Campanhas', 'objetivo', { transaction: t }),
    queryInterface.removeColumn('Campanhas', 'dataInic', { transaction: t }),
    queryInterface.removeColumn('Campanhas', 'dataFim', { transaction: t }),
    queryInterface.removeColumn('Campanhas', 'ColabId', { transaction: t }),
  ])),
};
