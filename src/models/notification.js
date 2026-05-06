'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    static associate(models) {
      //  User 
      Notification.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
    }
  }

  Notification.init(
    {
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: { msg: "Title is required" },
          len: {
            args: [3, 100],
            msg: "Title must be between 3 to 100 characters"
          }
        }
      },

      message: {
        type: DataTypes.STRING(500),
        allowNull: false,
        validate: {
          notEmpty: { msg: "Message is required" },
          len: {
            args: [10, 500],
            msg: "Message must be between 10 to 500 characters"
          }
        }
      },

      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
          references: {
          model: 'User',
          key: 'id'
        },
        validate: {
          notEmpty: { msg: "UserId is required" },
          isInt: { msg: "UserId must be integer" }
        }
      },

      type: {
        type: DataTypes.ENUM(
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
        type: DataTypes.BOOLEAN,
        allowNull: true, // null allowed 
        defaultValue: false
      },

      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },

      // createdAt: {
      //   type: DataTypes.DATE,
      //   allowNull: false,
      //   defaultValue: DataTypes.NOW
      // },

      // updatedAt: {
      //   type: DataTypes.DATE,
      //   allowNull: false,
      //   defaultValue: DataTypes.NOW
      // }
    },
    {
      sequelize,
      modelName: 'Notification',
      tableName: 'notifications',
      timestamps: true,
      underscored: false
      // indexes: [
      //   {
      //     fields: ['userId']
      //   },
      //   {
      //     fields: ['type']
      //   }
      // ]
    }
  );

  return Notification;
};



// indexing 
// relations like 1 to 1 , 1 to many, many to many 
// type, isActive 