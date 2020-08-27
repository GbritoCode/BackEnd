'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('colabs', {
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
      CPF: {
        allowNull: false,
        unique: true,
        type: Sequelize.INTEGER,
      },
      FornecId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'fornecs',
          key: 'id',
        },
      },
      log_usr: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },

      nome: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      dt_admiss: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      cel: {
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
      espec: {
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
    return queryInterface.dropTable('colabs');
  },
};
