'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('representantes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
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
      nome: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      TipoComisseId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tipoComisses',
          key: 'id',
        },
      },
      vlrFixMens: {
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
    return queryInterface.dropTable('representantes');
  },
};
