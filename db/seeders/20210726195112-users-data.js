'use strict';

// const bcrypt = require('bcryptjs')

// const password = 'demo'
// let hashedPassword;

// async function hashingFunc(password) {
//   hashedPassword = await bcrypt.hash(password, 12)
//   console.log(hashedPassword)
//   console.log(await bcrypt.compare(password, hashedPassword.toString()))
//   return hashedPassword
// }
// hashingFunc('demo')
// hashingFunc('practice')


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
      { username: 'Demo', hashedPassword: '$2a$12$/RnX3TyfpYE8sYf8BiT4ZO3EGVvzHsBW0v5STlrRSpT4TXRN1CAK2', email: 'demo@demo.com', createdAt: new Date(), updatedAt: new Date() },
      { username: 'Spuds', hashedPassword: '$2a$12$niaKR4d672q0LB/ADG8c/.0Rpm.EUNLGQBPneTWCznreqpvnFoiJS', email: 'spuds@spuds.com', createdAt: new Date(), updatedAt: new Date() }
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
