'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      fullName: {
        type: Sequelize.STRING(100),
        allowNull: false
      },

      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },

      password: {
        type: Sequelize.STRING,
        allowNull: false
      },

      affiseId: {
        type: Sequelize.STRING,
        allowNull: true
      },

      status: {
        type: Sequelize.ENUM('active', 'blocked'),
        allowNull: false,
        defaultValue: 'active'
      },

      role: {
        type: Sequelize.ENUM('admin', 'affiliate'),
        allowNull: false,
        defaultValue: 'affiliate'
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

    // performance (email pe search fast hoga)
    // await queryInterface.addIndex('users', ['email']);
    // await queryInterface.addIndex('users', ['affiseId']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');

    // ENUM cleanup 
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_users_status";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_users_role";');
  }
};

// index 
// affiseId 