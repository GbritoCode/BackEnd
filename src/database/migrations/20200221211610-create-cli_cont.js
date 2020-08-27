'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('cli_conts', {
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
      nome: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      cel: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      fone: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      skype: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      aniver: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      tipo_conta: {
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
    return queryInterface.dropTable('cli_conts');
  },
};
