'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Users', [
      { username: 'Demo', hashedPassword: 'demo', email: 'demo@demo.com', createdAt: new Date(), updatedAt: new Date() },
      { username: 'Spuds', hashedPassword: 'practice', email: 'spuds@spuds.com', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Users', null, { truncate: true, cascade: true, restartIdentity: true });
  }
};
