"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class signedBadges extends Model {
    static associate(models) {
      // signedBadges.belongsTo(models.badges);
      // signedBadges.belongsTo(models.developerUsers);
    }
  }
  signedBadges.init(
    {
      nameReceptor: DataTypes.STRING,
      emailReceptor: DataTypes.STRING,
      image: DataTypes.JSON,
      badgesId: DataTypes.INTEGER,
      developerUsersId: DataTypes.INTEGER,
      statusDelete: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "signedBadges",
    }
  );
  return signedBadges;
};
