'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('cli_rec_desps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      clienteId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'clientes',
          key: 'id',
        },
      },
      recDespId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'rec_desps',
          key: 'id',
        },
      },
      tipoCobranca: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      valorRec: {
        allowNull: false,
        type: Sequelize.REAL,
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
    return queryInterface.dropTable('cli_rec_desps');
  },
};
