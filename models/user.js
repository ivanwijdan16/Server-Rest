"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt.helper");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          notEmpty: { msg: "Email is required" },
          isEmail: { msg: "Your email is wrong" },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "Password is required" },
          len: [5, 12],
        },
      },
      role: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate(User) {
          User.password = hashPassword(User.password);
        },
      },
      sequelize,
      modelName: "User",
      timestamps: true,
      updatedAt: "updated_at",
      createdAt: "created_at",
    }
  );
  return User;
};
