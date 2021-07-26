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
  };
  return Question;
};