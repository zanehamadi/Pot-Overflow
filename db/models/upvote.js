'use strict';
module.exports = (sequelize, DataTypes) => {
  const Upvote = sequelize.define('Upvote', {
    userId: {
      type: DataTypes.INTEGER,
    },
    questionId: {
      type: DataTypes.INTEGER,
    },
    answerId: {
      type: DataTypes.INTEGER,
    }
  }, {});
  Upvote.associate = function (models) {
    // associations can be defined here
    Upvote.belongsTo(models.User, { foreignKey: 'userId' })
    Upvote.belongsTo(models.Answer, { foreignKey: 'answerId' })
    Upvote.belongsTo(models.Question, { foreignKey: 'questionId' })
  };
  return Upvote;
};
