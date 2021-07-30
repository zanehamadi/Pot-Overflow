'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Answers', [
      { answer: 'Try checking you outlet', questionId: 1, userId: 2, createdAt: new Date(), updatedAt: new Date() },
      { answer: 'Add pepper, duh', questionId: 1, userId: 2, createdAt: new Date(), updatedAt: new Date() },
      { answer: 'add less water', questionId: 1, userId: 2, createdAt: new Date(), updatedAt: new Date() },
      { answer: 'try a cup for a serving size of 12', questionId: 1, userId: 2, createdAt: new Date(), updatedAt: new Date() },
      { answer: 'basically chewy pasta', questionId: 1, userId: 2, createdAt: new Date(), updatedAt: new Date() },
      { answer: 'a week', questionId: 2, userId: 1, createdAt: new Date(), updatedAt: new Date() },
      { answer: 'try any red wine', questionId: 2, userId: 1, createdAt: new Date(), updatedAt: new Date() },
      { answer: 'depends on how much you are boiling, maybe 5-10 minutes', questionId: 2, userId: 1, createdAt: new Date(), updatedAt: new Date() },
      { answer: 'definitely 400', questionId: 2, userId: 1, createdAt: new Date(), updatedAt: new Date() },
      { answer: 'both work, but I like pan better', questionId: 2, userId: 1, createdAt: new Date(), updatedAt: new Date() },

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Answers', null, { truncate: true, cascade: true, restartIdentity: true });
  }
};
