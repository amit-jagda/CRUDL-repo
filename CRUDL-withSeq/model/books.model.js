const { DataTypes } = require("sequelize");

const sequelize = require("../sequelise/sequelize");

const Book = sequelize.define(
  "book",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    author: DataTypes.STRING,
    publishyear: DataTypes.INTEGER,
    status: DataTypes.STRING,
  },
  {
    tableName: "books",
  }
);

module.exports = Book;
