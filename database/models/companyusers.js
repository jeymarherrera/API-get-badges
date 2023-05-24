"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class companyUsers extends Model {
    static associate(models) {
      companyUsers.belongsTo(models.emails, {
        as: "emailsCompany",
        foreignKey: "emailsId",
        onDelete: "CASCADE",
      });
      companyUsers.hasMany(models.badges, {
        as: "userCompany",
        foreignKey: "companyUsersId",
        onDelete: "CASCADE",
      });
    }
  }
  companyUsers.init(
    {
      name: DataTypes.STRING,
      logo: DataTypes.STRING,
      type: DataTypes.STRING,
      emailsId: DataTypes.INTEGER,
      statusDelete: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "companyUsers",
    }
  );
  return companyUsers;
};