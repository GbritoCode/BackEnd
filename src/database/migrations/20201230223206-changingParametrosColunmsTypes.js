module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.changeColumn('Parametros', 'vlrMinHr', {
      allowNull: false,
      type: Sequelize.DataTypes.INTEGER,
    }, { transaction: t }),
    queryInterface.changeColumn('Parametros', 'vlrBsHr', {
      allowNull: false,
      type: Sequelize.DataTypes.INTEGER,
    }, { transaction: t }),
    queryInterface.changeColumn('Parametros', 'vlrBsDesp', {
      allowNull: false,
      type: Sequelize.DataTypes.INTEGER,
    }, { transaction: t }),
    queryInterface.changeColumn('Parametros', 'percAdiantaPgmto', {
      allowNull: false,
      type: Sequelize.DataTypes.INTEGER,
    }, { transaction: t }),
  ])),

  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.changeColumn('Parametros', 'vlrMinHr', {
      allowNull: false,
      type: Sequelize.DataTypes.NUMERIC,
    }, { transaction: t }),
    queryInterface.changeColumn('Parametros', 'vlrBsHr', {
      allowNull: false,
      type: Sequelize.DataTypes.NUMERIC,
    }, { transaction: t }),
    queryInterface.changeColumn('Parametros', 'vlrBsDesp', {
      allowNull: false,
      type: Sequelize.DataTypes.NUMERIC,
    }, { transaction: t }),
    queryInterface.changeColumn('Parametros', 'percAdiantaPgmto', {
      allowNull: false,
      type: Sequelize.DataTypes.NUMERIC,
    }, { transaction: t }),
  ])),
};
