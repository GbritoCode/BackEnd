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
      percnt_comiss: {
        allowNull: false,
        type: Sequelize.NUMERIC,
      },
      vlr_fix_mens: {
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
