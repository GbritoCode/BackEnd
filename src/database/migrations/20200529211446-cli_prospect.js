module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('cli_prospects', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER,
    },
    EmpresaId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'empresas',
        key: 'id',
      },
      CNPJ: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      nomeAbv: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      representante: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      tipo_comiss: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('cli_prospects'),
};
