module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ParametrosEmails', {
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
    bccEmailOrc: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    bccEmailRev: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    bccEmailFat: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    fromEmailOrc: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    fromEmailRev: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    fromEmailFat: {
      allowNull: false,
      type: Sequelize.STRING,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('ParametrosEmails'),
};
