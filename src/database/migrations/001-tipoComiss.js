module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('tipoComisses', {
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
    desc: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    prcnt: {
      allowNull: false,
      type: Sequelize.REAL,
    },
    bsComiss: {
      allowNull: false,
      type: Sequelize.REAL,
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

  down: (queryInterface) => queryInterface.dropTable('tipoComisses'),
};
