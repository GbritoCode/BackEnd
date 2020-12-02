module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('condPgmtos', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    EmpresaId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'empresas',
        key: 'id',
      },
    },
    cod: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    desc: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    diasPrazo: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('condPgmtos'),
};
