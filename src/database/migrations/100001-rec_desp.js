module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('recDesps', {
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
    itmControleId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'itmControles',
        key: 'id',
      },
    },
    desc: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    recDesp: {
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

  down: (queryInterface) => queryInterface.dropTable('recDesps'),
};
