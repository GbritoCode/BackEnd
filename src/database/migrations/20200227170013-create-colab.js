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
      FornecId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'fornecs',
          key: 'id',
        },
      },
      PerfilId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'perfils',
          key: 'id',
        },
      },
      CPF: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      nome: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      dtAdmiss: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      cel: {
        allowNull: false,
        type: Sequelize.STRING,
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
