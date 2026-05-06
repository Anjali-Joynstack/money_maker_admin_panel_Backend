'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('lockerSettings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      lockerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true, 
        references: {
          model: 'lockers', 
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      allowedCountries: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: ["ALL"]
      },

      allowedDevices: {
        type: Sequelize.ENUM('all', 'mobile', 'desktop', 'tablet'),
        allowNull: false,
        defaultValue: 'all'
      },

      allowedOs: {
        type: Sequelize.ENUM(
          'all',
          'android',
          'ios',
          'windows',
          'mac'
        ),
        allowNull: false,
        defaultValue: 'all'
      },

      priorityType: {
        type: Sequelize.ENUM(
          'random',
          'highest_payout',
          'manual'
        ),
        allowNull: false,
        defaultValue: 'random'
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

    //  Indexing
    // await queryInterface.addIndex('lockerSettings', ['lockerId']);
    // await queryInterface.addIndex('lockerSettings', ['priorityType']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('lockerSettings');

    // ENUM cleanup 
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_lockerSettings_allowedDevices";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_lockerSettings_allowedOs";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_lockerSettings_priorityType";');
  }
};

// indexing 