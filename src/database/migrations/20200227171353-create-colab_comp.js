'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('colab_comps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ColabId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'colabs',
          key: 'id',
        },
      },
      nivel: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      tipo_valor: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      valor: {
        allowNull: false,
        type: Sequelize.NUMERIC,
      },
      data_inic: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      data_fim: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      tipo_atend: {
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
    return queryInterface.dropTable('colab_comps');
  },
};
