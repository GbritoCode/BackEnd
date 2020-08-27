'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('clientes', {
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
      CNPJ: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      nome_abv: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      representante: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      tipo_comiss: {
        type: Sequelize.INTEGER,
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
    });
  },
  down: queryInterface => {
    return queryInterface.dropTable('clientes');
  },
};
