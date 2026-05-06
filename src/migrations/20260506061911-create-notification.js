'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('notifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      title: {
        type: Sequelize.STRING(100),
        allowNull: false
      },

      message: {
        type: Sequelize.STRING(500),
        allowNull: false
      },

      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users', 
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE' // user delete → notifications delete
      },

      type: {
        type: Sequelize.ENUM(
          'system',
          'earning',
          'alert',
          'offer',
          'security'
        ),
        allowNull: false,
        defaultValue: 'system'
      },

      readStatus: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },

      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });


    // await queryInterface.addIndex('notifications', ['userId']);   // fetch user notifications
    // await queryInterface.addIndex('notifications', ['type']);     // filter by type
    // await queryInterface.addIndex('notifications', ['isActive']); // active/inactive
    // await queryInterface.addIndex('notifications', ['readStatus']); // unread filter
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('notifications');

    // ENUM cleanup 
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_notifications_type";');
  }
};

// indexing 