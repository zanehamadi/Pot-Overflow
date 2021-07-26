'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    answer: {
      type: DataTypes.STRING,
    },
    questionId: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER
    }
  }, {});
  Answer.associate = function (models) {
    // associations can be defined here
    Answer.belongsTo(models.User, { foreignKey: 'userId' })
    Answer.belongsTo(models.Question, { foreignKey: 'questionId' })
    Answer.hasMany(models.Upvote, { foreignKey: 'answerId' })
    Answer.hasMany(models.Downvote, { foreignKey: 'answerId' })
  };
  return Answer;
};
