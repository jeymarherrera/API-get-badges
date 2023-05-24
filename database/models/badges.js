"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class badges extends Model {
    static associate(models) {
      badges.belongsTo(models.companyUsers, {
        as: "userCompany",
        foreignKey: "companyUsersId",
        onDelete: "CASCADE",
      });
      // badges.hasOne(models.signedBadges);
    }
  }
  badges.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.JSON,
      knowledge: DataTypes.STRING,
      speciality: DataTypes.STRING,
      criteria: DataTypes.STRING,
      skill: DataTypes.STRING,
      platformEvent: DataTypes.STRING,
      generation: DataTypes.STRING,
      companyUsersId: DataTypes.INTEGER,
      statusDelete: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "badges",
    }
  );
  return badges;
};
