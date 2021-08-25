module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('Campanhas', 'dashFields', {
      allowNull: true,
      type: Sequelize.DataTypes.STRING,
      defaultValue: 'EmpIncluida,FupsTot,EmpFin,FupsProx,StatusCli,FinsMotivo,',

    }, { transaction: t }),

  ])),
  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('Campanhas', 'dashFields', { transaction: t }),
  ])),
};
