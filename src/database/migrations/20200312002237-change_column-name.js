'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('currencies','name',{
        type:Sequelize.STRING,
        allowNull:true,
        unique:true
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('currencies','name',{
        type:Sequelize.STRING,
        allowNull:true,
        unique:false
      });

  }
};
