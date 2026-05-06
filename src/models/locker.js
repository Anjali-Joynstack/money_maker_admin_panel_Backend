'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Locker extends Model {
    static associate(models) {
      //  Relations

      //  User
      Locker.belongsTo(models.User, {
        foreignKey: 'userId',

      });

      //  Domain
      Locker.belongsTo(models.Domain, {
        foreignKey: 'domainId',

      });

      // Locker Setting
      Locker.hasOne(models.LockerSetting, {
        foreignKey: 'lockerId'

      });
    }
  }

  Locker.init(
    {
      name: {
        type: DataTypes.STRING(150),
        allowNull: false,
        validate: {
          notEmpty: { msg: "Locker name is required" },
          len: {
            args: [3, 150],
            msg: "Name must be between 3 to 150 characters"
          },
          is: {
            args: /^[A-Za-z ]+$/,
            msg: "Name must contain only alphabets and spaces"
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

      domainId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Domain',
          key: 'id'
        },
        validate: {
          notEmpty: { msg: "DomainId is required" },
          isInt: { msg: "DomainId must be integer" }
        }
      },

      type: {
        type: DataTypes.ENUM('content', 'file', 'link', 'captcha'),
        allowNull: false,
        defaultValue: 'content'
      },

      uniqueCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: { msg: "Unique code is required" },
          len: {
            args: [4, 10],
            msg: "Unique code must be 4 to 10 characters"
          },
          is: {
            args: /^[A-Za-z0-9]+$/,
            msg: "Only alphanumeric characters allowed"
          }
        }
      },

      category: {
        type: DataTypes.ENUM('adult', 'mainstream'),
        allowNull: false,
        defaultValue: 'mainstream'
      },

      notes: {
        type: DataTypes.STRING(500),
        allowNull: false,
        validate: {
          notEmpty: { msg: "Notes are required" },
          len: {
            args: [10, 500],
            msg: "Notes must be between 10 to 500 characters"
          }
        }
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
      modelName: 'Locker',
      tableName: 'lockers',
      timestamps: true,
      underscored: false,

      hooks: {
        beforeCreate: async (locker) => {
          let isUnique = false;
          let code;

          while (!isUnique) {
            const randomNum = Math.floor(1000 + Math.random() * 9000);
            const randomStr = Math.random().toString(36).substring(2, 5); // abc

            code = `${randomStr}${randomNum}`; // ex: abc1234

            const existing = await Locker.findOne({
              where: { uniqueCode: code }
            });

            if (!existing) isUnique = true;
          }

          locker.uniqueCode = code;
        }
      }
      // indexes: [
      //   {
      //     unique: true,
      //     fields: ['uniqueCode']
      //   },
      //   {
      //     fields: ['userId']
      //   },
      //   {
      //     fields: ['domainId']
      //   }
      // ]
    }
  );

  return Locker;
};



// category values 
// indexing 
// relations like 1 to 1 , 1 to many, many to many 
// uniqueCode generate mix ex abc123 

