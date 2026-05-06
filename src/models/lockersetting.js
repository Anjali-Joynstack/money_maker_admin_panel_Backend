'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class LockerSetting extends Model {
    static associate(models) {
      // Locker
      LockerSetting.belongsTo(models.Locker, {
        foreignKey: 'lockerId',

      });
    }
  }

  LockerSetting.init(
    {
      lockerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
          references: {
          model: 'Locker',
          key: 'id'
        },
        unique: {
          msg: "Settings already exist for this locker"
        },
        validate: {
          notEmpty: { msg: "LockerId is required" },
          isInt: { msg: "LockerId must be integer" }
        }
      },

      //  Countries (JSON array )
      allowedCountries: {
        type: DataTypes.JSON, // ["IN", "US"]
        allowNull: false,
        defaultValue: ["ALL"],
        validate: {
          isValidCountries(value) {
            if (!Array.isArray(value)) {
              throw new Error("allowedCountries must be an array");
            }
          }
        }
      },

      //  Devices
      allowedDevices: {
        type: DataTypes.ENUM('all', 'mobile', 'desktop', 'tablet'),
        allowNull: false,
        defaultValue: 'all'
      },

      //  OS
      allowedOs: {
        type: DataTypes.ENUM(
          'all',
          'android',
          'ios',
          'windows',
          'mac'
        ),
        allowNull: false,
        defaultValue: 'all'
      },

      //  Priority Logic
      priorityType: {
        type: DataTypes.ENUM('random', 'highest_payout', 'manual'),
        allowNull: false,
        defaultValue: 'random'
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
      modelName: 'LockerSetting',
      tableName: 'lockerSettings',
      timestamps: true,
      underscored: false
      // indexes: [
      //   {
      //     unique: true,
      //     fields: ['lockerId']
      //   }
      // ]
    }
  );

  return LockerSetting;
};



// indexing 
// relations like 1 to 1 , 1 to many, many to many 
// allowedDevices, allowedOs array ya enum
// priorityType 
