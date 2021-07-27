'use strict';
module.exports = (sequelize, DataTypes) => {
  const Downvote = sequelize.define('Downvote', {
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
  Downvote.associate = function (models) {
    // associations can be defined here
    Downvote.belongsTo(models.User, { foreignKey: 'userId' })
    Downvote.belongsTo(models.Answer, { foreignKey: 'answerId' })
    Downvote.belongsTo(models.Question, { foreignKey: 'questionId' })
  };
  return Downvote;
};
