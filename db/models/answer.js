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
  };
  return Answer;
};