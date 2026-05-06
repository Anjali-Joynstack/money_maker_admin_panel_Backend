'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('lockers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      name: {
        type: Sequelize.STRING(150),
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
        onDelete: 'CASCADE'
      },

      domainId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'domains', 
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      type: {
        type: Sequelize.ENUM('content', 'file', 'link', 'captcha'),
        allowNull: false,
        defaultValue: 'content'
      },

      uniqueCode: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },

      category: {
        type: Sequelize.ENUM('adult', 'mainstream'),
        allowNull: false,
        defaultValue: 'mainstream'
      },

      notes: {
        type: Sequelize.STRING(500),
        allowNull: false
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


    // await queryInterface.addIndex('lockers', ['uniqueCode']); // lookup by code
    // await queryInterface.addIndex('lockers', ['userId']);     // user lockers
    // await queryInterface.addIndex('lockers', ['domainId']);   // domain filtering
    // await queryInterface.addIndex('lockers', ['category']);   // adult/mainstream
    // await queryInterface.addIndex('lockers', ['isActive']);   // active filter
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('lockers');

    // ENUM cleanup 
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_lockers_type";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_lockers_category";');
  }
};

// indexing 