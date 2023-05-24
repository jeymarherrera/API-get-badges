'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('experiences', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      experience: {
        type: Sequelize.STRING
      },
      dateStart: {
        type: Sequelize.DATE
      },
      dateFinish: {
        type: Sequelize.DATE
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
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('experiences');
  }
};