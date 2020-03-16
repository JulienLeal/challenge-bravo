'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('currencies','rates',{
        type: Sequelize.JSON,
        allowNull: false
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('currencies','rates',{
        type: Sequelize.JSON,
        allowNull: false
      });

  }
};