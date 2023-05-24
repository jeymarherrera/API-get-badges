"use strict";
const { Model } = require("sequelize");
const companyusers = require("./companyusers");
module.exports = (sequelize, DataTypes) => {
  class emails extends Model {
    static associate(models) {
      emails.hasOne(models.companyUsers, {
        as: "emailsCompany",
        foreignKey: "emailsId",
        onDelete: "CASCADE",
      });
      emails.hasOne(models.developerUsers, {
        as: "emailsDev",
        foreignKey: "emailsId",
        onDelete: "CASCADE",
      });
    }
  }
  emails.init(
    {
      email: DataTypes.STRING,
      rol: DataTypes.STRING,
      statusDelete: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "emails",
    }
  );
  return emails;
};
