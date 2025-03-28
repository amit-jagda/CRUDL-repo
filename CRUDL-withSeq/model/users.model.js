const { DataTypes } = require("sequelize");
const sequelize = require("../sequelise/sequelize");

// User Object
const Users = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

module.exports = { Users };
