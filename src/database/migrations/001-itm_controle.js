module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('itmControles', {
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
    descItem: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    tipoItem: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    contaContabil: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    centCusto: {
      allowNull: false,
      type: Sequelize.STRING,
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

  down: (queryInterface) => queryInterface.dropTable('itmControles'),
};
