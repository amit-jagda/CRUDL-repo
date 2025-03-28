const mysql = require("mysql2");
const connectMySQL = require("../connection");

// create connection
const booksDatabase = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "book_store",
});

// call
connectMySQL(booksDatabase);

module.exports = booksDatabase;
