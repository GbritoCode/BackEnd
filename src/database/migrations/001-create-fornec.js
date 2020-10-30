'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('fornecs', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
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
      CondPgmtoId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'condPgmtos',
          key: 'id',
        },
      },
      CNPJ: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      nome: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      nomeConta: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      fone: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      cep: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      rua: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      numero: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      complemento: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      bairro: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      cidade: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      uf: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      banco: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      agencia: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      conta: {
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
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('fornecs');
  },
};
