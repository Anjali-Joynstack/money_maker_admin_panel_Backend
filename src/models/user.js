'use strict';
const { Model } = require('sequelize');
const bcrypt = require("bcrypt");
const serverConfig = require("../config/server.config")

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      //  Relations

      //  Locker
      User.hasMany(models.Locker, {
        foreignKey: 'userId',

      });

      //  Notification
      User.hasMany(models.Notification, {
        foreignKey: 'userId',

      });


      // Domain
      User.hasMany(models.Domain, {
        foreignKey: 'userId'

      });
    }
  }

  User.init(
    {
      fullName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: { msg: "Name is required" },
          len: {
            args: [3, 100],
            msg: "Name must be between 3 to 100 characters"
          },
          is: {
            args: /^[A-Za-z]+(?: [A-Za-z]+)*$/, // only alphabets + single space
            msg: "Name must contain only letters and single spaces (no digits/symbols)"
          }
        }
      },

      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: {
          msg: "Email already exists"
        },
        validate: {
          notEmpty: { msg: "Email is required" },
          isEmail: { msg: "Invalid email format" },
          len: {
            args: [9, 100],
            msg: "Email must be max 100 characters"
          }
        }
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Password is required" },
          len: {
            args: [8, 50],
            msg: "Password must be between 8 to 50 characters"
          },
          is: {
            args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
            msg: "Password must include uppercase, lowercase, number and special character"
          }
        }
      },

      affiseId: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      status: {
        type: DataTypes.ENUM('active', 'blocked'),
        allowNull: false,
        defaultValue: 'active'
      },

      role: {
        type: DataTypes.ENUM('admin', 'affiliate'),
        allowNull: false,
        defaultValue: 'affiliate'
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
      modelName: 'User',
      tableName: 'users',
      timestamps: true,
      underscored: false,

    }
  );

  User.beforeCreate(function encrypt(user) {
    const encryptedPassword = bcrypt.hashSync(
      user.password,
      +serverConfig.BCRYPT.salt_rounds
    );
    user.password = encryptedPassword;
  });
  User.beforeUpdate(function (user) {
    if (user.changed('password')) {
      user.password = bcrypt.hashSync(
        user.password,
        +serverConfig.BCRYPT.salt_rounds
      );
    }
  });

  return User;
};




// affiseId reference
// indexing 
// relations like 1 to 1 , 1 to many, many to many 



// separate table of user and relations 
// token redis ya db 