"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("badges", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      knowledge: {
        type: Sequelize.STRING,
      },
      speciality: {
        type: Sequelize.STRING,
      },
      criteria: {
        type: Sequelize.STRING,
      },
      skill: {
        type: Sequelize.STRING,
      },
      platformEvent: {
        type: Sequelize.STRING,
      },
      generation: {
        type: Sequelize.STRING,
      },
      companyUsersId: {
        type: Sequelize.INTEGER,
        references: {
          model: "companyUsers",
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
    await queryInterface.dropTable("badges");
  },
};
