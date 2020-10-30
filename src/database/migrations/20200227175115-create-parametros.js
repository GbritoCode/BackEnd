'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('parametros', {
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
      impostos: {
        allowNull: false,
        type: Sequelize.NUMERIC,
      },
      vlrMinHr: {
        allowNull: false,
        type: Sequelize.NUMERIC,
      },
      vlrBsHr: {
        allowNull: false,
        type: Sequelize.NUMERIC,
      },
      vlrBsDesp: {
        allowNull: false,
        type: Sequelize.NUMERIC,
      },
      adiantaPgmto: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      percAdiantaPgmto: {
        allowNull: false,
        type: Sequelize.NUMERIC,
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
    return queryInterface.dropTable('parametros');
  },
};
