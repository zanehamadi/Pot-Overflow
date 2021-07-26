'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    question: {
      type: DataTypes.STRING,
    },
    additional_info: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER
    }
  }, {});
  Question.associate = function (models) {
    // associations can be defined here
    Question.belongsTo(models.User, { foreignKey: 'userId' })
    Question.hasMany(models.Answer, { foreignKey: 'questionId' })
    Question.hasMany(models.Upvote, { foreignKey: 'questionId' })
    Question.hasMany(models.Downvote, { foreignKey: 'questionId' })
  };
  return Question;
};
