'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Downvotes', [
      { userId: 2, questionId: 1, answerId: 1, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Downvotes', null, { truncate: true, cascade: true, restartIdentity: true });
  }
};
