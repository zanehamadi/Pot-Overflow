'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Upvotes', [
      { userId: 1, questionId: 1, answerId: 1, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Upvotes', null, { truncate: true, cascade: true, restartIdentity: true });
  }
};
