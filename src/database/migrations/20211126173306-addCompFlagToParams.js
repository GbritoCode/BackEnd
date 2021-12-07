module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('Parametros', 'compFlag', {
      allowNull: false,
      defaultValue: false,
      type: Sequelize.DataTypes.BOOLEAN,
    }, { transaction: t }),
    queryInterface.addColumn('Parametros', 'RecDespCompHrs', {
      allowNull: true,
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: 'RecDesps',
        key: 'id',
      },
    }, { transaction: t }),
  ])),
  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('Parametros', 'compFlag', { transaction: t }),
    queryInterface.removeColumn('Parametros', 'RecDespCompHrs', { transaction: t }),
  ])),
};
