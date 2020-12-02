module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('clientes', {
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
    },
    TipoComisseId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'tipoComisses',
        key: 'id',
      },
    },
    RepresentanteId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'representantes',
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
    prospect: {
      allowNull: false,
      defaultValue: true,
      type: Sequelize.BOOLEAN,
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
  down: (queryInterface) => queryInterface.dropTable('clientes'),
};
