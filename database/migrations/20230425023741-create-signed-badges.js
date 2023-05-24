"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("signedBadges", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nameReceptor: {
        type: Sequelize.STRING,
      },
      emailReceptor: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.JSON,
      },
      badgesId: {
        type: Sequelize.INTEGER,
        references: {
          model: "badges",
          key: "id",
        },
        onDeleted: "CASCADE",
        onUpdated: "CASCADE",
      },
      developerUsersId: {
        type: Sequelize.INTEGER,
        references: {
          model: "developerUsers",
          key: "id",
        },
        onDeleted: "CASCADE",
        onUpdated: "CASCADE",
      },
      statusDelete: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("signedBadges");
  },
};
