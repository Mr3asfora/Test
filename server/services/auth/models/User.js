const { DataTypes } = require("sequelize");

const sequelize = require("../../../databases/SQL/pool");

const userRoles = require("../../../utils/UserRoles");

const User = sequelize.define("User", {
  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  Password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Role: {
    type: DataTypes.ENUM(Object.values(userRoles)),
    defaultValue: userRoles.user,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

module.exports = User;
