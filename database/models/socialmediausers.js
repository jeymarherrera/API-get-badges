'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class socialmediaUsers extends Model {
    static associate(models) {
      socialmediaUsers.belongsTo(models.developerUsers, {
        as: "developerSocialMedia",
        foreignKey: "developerUsersId",
        onDelete: "CASCADE",
      });
    }
  }
  socialmediaUsers.init({
    socialMedia: DataTypes.STRING,
    url: DataTypes.STRING,
    developerUsersId: DataTypes.INTEGER,
    statusDelete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'socialmediaUsers',
  });
  return socialmediaUsers;
};