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
      vlr_min_hr: {
        allowNull: false,
        type: Sequelize.NUMERIC,
      },
      vlr_bs_hr: {
        allowNull: false,
        type: Sequelize.NUMERIC,
      },
      vlr_bs_desp: {
        allowNull: false,
        type: Sequelize.NUMERIC,
      },
      adianta_pgmto: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      perc_adianta_pgmto: {
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
