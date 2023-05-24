'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class projectUsers extends Model {
    static associate(models) {
      projectUsers.belongsTo(models.developerUsers, {
        as: "developerProject",
        foreignKey: "developerUsersId",
        onDelete: "CASCADE",
      });
    }
  }
  projectUsers.init({
    project: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
    developerUsersId: DataTypes.INTEGER,
    statusDelete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'projectUsers',
  });
  return projectUsers;
};