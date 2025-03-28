const mysql = require("mysql2");
const connectMySQL = require("../connection");

// create connection
const database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "book_store",
});

// call
connectMySQL(database);

module.exports = database;
