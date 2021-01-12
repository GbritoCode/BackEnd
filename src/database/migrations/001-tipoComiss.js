module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('TipoComisses', {
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    deletedAt: {
      type: Sequelize.DATE,
    },
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
        model: 'Empresas',
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

  }),

  down: (queryInterface) => queryInterface.dropTable('TipoComisses'),
};
