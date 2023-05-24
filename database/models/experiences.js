'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class experiences extends Model {
    static associate(models) {
      experiences.belongsTo(models.developerUsers, {
        as: "developerExperience",
        foreignKey: "developerUsersId",
        onDelete: "CASCADE",
      });
    }
  }
  experiences.init({
    experience: DataTypes.STRING,
    dateStart: DataTypes.DATE,
    dateFinish: DataTypes.DATE,
    developerUsersId: DataTypes.INTEGER,
    statusDelete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'experiences',
  });
  return experiences;
};