'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class languagesUsers extends Model {
    static associate(models) {
      languagesUsers.belongsTo(models.developerUsers, {
        as: "developerLanguage",
        foreignKey: "developerUsersId",
        onDelete: "CASCADE",
      });
    }
  }
  languagesUsers.init({
    language: DataTypes.STRING,
    level: DataTypes.STRING,
    developerUsersId: DataTypes.INTEGER,
    statusDelete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'languagesUsers',
  });
  return languagesUsers;
};