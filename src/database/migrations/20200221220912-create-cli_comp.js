'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('cli_comps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ClienteId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'clientes',
          key: 'id',
        },
      },
      rz_social: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      cond_pgmto: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      nome_abv: {
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
        type: Sequelize.INTEGER,
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
      insc_mun: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      insc_uf: {
        allowNull: false,
        type: Sequelize.INTEGER,
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
    return queryInterface.dropTable('cli_comps');
  },
};
