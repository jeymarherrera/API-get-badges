'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class studiesUsers extends Model {
    static associate(models) {
      studiesUsers.belongsTo(models.developerUsers, {
        as: "developerStudies",
        foreignKey: "developerUsersId",
        onDelete: "CASCADE",
      });
    }
  }
  studiesUsers.init({
    study: DataTypes.STRING,
    dateStart: DataTypes.DATE,
    dateFinish: DataTypes.DATE,
    developerUsersId: DataTypes.INTEGER,
    statusDelete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'studiesUsers',
  });
  return studiesUsers;
};