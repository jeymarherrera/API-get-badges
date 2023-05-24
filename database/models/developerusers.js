"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class developerUsers extends Model {
    static associate(models) {
      developerUsers.belongsTo(models.emails, {
        as: "emailsDev",
        foreignKey: "emailsId",
        onDelete: "CASCADE",
      });
      developerUsers.hasMany(models.experiences, {
        as: "developerExperience",
        foreignKey: "developerUsersId",
        onDelete: "CASCADE",
      });
      // developerUsers.hasMany(models.languagesUsers, {
      //   as: "developerLanguage",
      //   foreignKey: "developerUsersId",
      //   onDelete: "CASCADE",
      // });
      // developerUsers.hasMany(models.projectUsers, {
      //   as: "developerProject",
      //   foreignKey: "developerUsersId",
      //   onDelete: "CASCADE",
      // });
      // developerUsers.hasMany(models.socialMediaUsers, {
      //   as: "developerSocialMedia",
      //   foreignKey: "developerUsersId",
      //   onDelete: "CASCADE",
      // });
      // developerUsers.hasMany(models.studiesUsers, {
      //   as: "developerStudies",
      //   foreignKey: "developerUsersId",
      //   onDelete: "CASCADE",
      // });
    }
  }
  developerUsers.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      country: DataTypes.STRING,
      emailsId: DataTypes.INTEGER,
      statusDelete: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "developerUsers",
    }
  );
  return developerUsers;
};
