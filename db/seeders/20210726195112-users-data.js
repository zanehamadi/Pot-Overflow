'use strict';



module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      { username: 'Demo', hashedPassword: '$2a$12$/RnX3TyfpYE8sYf8BiT4ZO3EGVvzHsBW0v5STlrRSpT4TXRN1CAK2', email: 'demo@demo.com', createdAt: new Date(), updatedAt: new Date() },
      { username: 'Spuds', hashedPassword: '$2a$12$niaKR4d672q0LB/ADG8c/.0Rpm.EUNLGQBPneTWCznreqpvnFoiJS', email: 'spuds@spuds.com', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, { truncate: true, cascade: true, restartIdentity: true });
  }
};
