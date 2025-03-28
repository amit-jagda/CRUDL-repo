const { Sequelize } = require("sequelize");
const connectMySQL = require("./connection");

// get database
const sequelize = new Sequelize("book_store", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

// connect to database
connectMySQL(sequelize);

module.exports = sequelize;
