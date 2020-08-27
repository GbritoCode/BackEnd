'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('segmentos', {
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
      Und_negId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'und_negs',
          key: 'id',
        },
      },
      ProdutoId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'produtos',
          key: 'id',
        },
      },
      AreaId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'areas',
          key: 'id',
        },
      },
      desc_segmt: {
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
    return queryInterface.dropTable('segmentos');
  },
};