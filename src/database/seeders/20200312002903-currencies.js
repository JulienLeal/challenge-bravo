'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const date_now = new Date()
    return queryInterface.bulkInsert('currencies', [{
        name: 'BRL',
        rates: '{"USD":{"rate":4.815101}}',
        created_at:'2020-03-11 22:46:00',
        updated_at:'2020-03-11 22:46:00'
      },
      {
        name: 'USD',
        rates: '{"BRL":{"rate":0.207672}}',
        created_at:'2020-03-11 22:46:00',
        updated_at:'2020-03-11 22:46:00'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('currencies', null, {});
  }
};
