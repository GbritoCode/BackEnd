'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('itm_controles', {
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
      desc_item: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      tipo_item: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      conta_contabil: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      cent_custo: {
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
    return queryInterface.dropTable('itm_controles');
  },
};
