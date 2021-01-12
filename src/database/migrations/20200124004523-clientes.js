module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Clientes', {
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    deletedAt: {
      type: Sequelize.DATE,
    },
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
        model: 'Empresas',
        key: 'id',
      },
    },
    TipoComisseId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'TipoComisses',
        key: 'id',
      },
    },
    RepresentanteId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Representantes',
        key: 'id',
      },
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
    rzSoc: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    fantasia: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    prospect: {
      allowNull: false,
      type: Sequelize.BOOLEAN,
    },

  }),
  down: (queryInterface) => queryInterface.dropTable('Clientes'),
};
