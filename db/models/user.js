'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    },
    hashedPassword: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING
    }
  }, {});
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};