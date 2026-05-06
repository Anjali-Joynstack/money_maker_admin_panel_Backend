'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('domains', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
      },

      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users', 
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      cNameTarget: {
        type: Sequelize.STRING(255),
        allowNull: true
      },

      isVerified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },

      verifiedAt: {
        type: Sequelize.DATE,
        allowNull: true
      },

      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },

      blockedReason: {
        type: Sequelize.STRING(400),
        allowNull: true
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


    // await queryInterface.addIndex('domains', ['name']);      // unique lookup
    // await queryInterface.addIndex('domains', ['userId']);    // user domains
    // await queryInterface.addIndex('domains', ['isVerified']); // verified filter
    // await queryInterface.addIndex('domains', ['isActive']);   // active domains
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('domains');
  }
};

// indexing 