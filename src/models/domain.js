'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Domain extends Model {
    static associate(models) {
      //  User
      Domain.belongsTo(models.User, {
        foreignKey: 'userId',

      });

      // Locker
      Domain.hasMany(models.Locker, {
        foreignKey: 'domainId'

      });
    }
  }

  Domain.init(
    {
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: {
          msg: "Domain already exists"
        },
        validate: {
          notEmpty: { msg: "Domain name is required" },
          len: {
            args: [3, 255],
            msg: "Domain must be between 3 to 255 characters"
          },
          is: {
            // domain validation (no http/https)
            args: /^(?!:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/,
            msg: "Invalid domain format (example: example.com)"
          }
        }
      },

      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "UserId is required" },
          isInt: { msg: "UserId must be integer" }
        },
        references: {
          model: 'User',
          key: 'id'
        }
      },

      cNameTarget: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
          is: {
            args: /^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/,
            msg: "Invalid CNAME format"
          }
        }
      },


      isVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },

      verifiedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
          is: /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/
        }
      },

      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },

      blockedReason: {
        type: DataTypes.STRING(400),
        allowNull: true,
        validate: {
          len: {
            args: [10, 400],
            msg: "Blocked reason must be between 10 to 400 characters"
          }
        }
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
      modelName: 'Domain',
      tableName: 'domains',
      timestamps: true,
      underscored: false
      // indexes: [
      //   {
      //     unique: true,
      //     fields: ['name']
      //   },
      //   {
      //     fields: ['userId']
      //   }
      // ]
    }
  );

  return Domain;
};


//  verifiedAt date 
// indexing 
// relations like 1 to 1 , 1 to many, many to many 