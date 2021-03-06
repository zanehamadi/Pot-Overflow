'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Questions', [
      { question: 'My oven is cold', additional_info: "Won't turn on automatically", userId: 1, createdAt: new Date(), updatedAt: new Date() },
      { question: 'My dish tastes bland', additional_info: "I already added a ton of salt", userId: 1, createdAt: new Date(), updatedAt: new Date() },
      { question: 'My dough is not rising properly', additional_info: "Not sure what I did wrong", userId: 1, createdAt: new Date(), updatedAt: new Date() },
      { question: 'How much sugar go in cookies', additional_info: "I don't want them to turn out too sweet", userId: 1, createdAt: new Date(), updatedAt: new Date() },
      { question: 'What is al dente?', additional_info: "People keep using this work but idk what it means", userId: 1, createdAt: new Date(), updatedAt: new Date() },
      { question: 'How long does chicken last in the fridge?', additional_info: "Won't be home for a week", userId: 2, createdAt: new Date(), updatedAt: new Date() },
      { question: 'What type of wine goes well with steak?', additional_info: "I usually don't drink wine but I want to impress the in-laws", userId: 2, createdAt: new Date(), updatedAt: new Date() },
      { question: 'How long should I boil pasta for?', additional_info: "My pasta always turns out mushy", userId: 2, createdAt: new Date(), updatedAt: new Date() },
      { question: 'What temperature do I bake pizza at?', additional_info: "debating between 350 and 400 degrees", userId: 2, createdAt: new Date(), updatedAt: new Date() },
      { question: 'Should I cook steak on the pan or grill?', additional_info: "I bought these wagyu steaks from Costco and not sure how to cook them", userId: 2, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Questions', null, { truncate: true, cascade: true, restartIdentity: true });
  }
};
