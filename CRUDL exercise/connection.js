async function connectMySQL(database) {
  return database.connect((err) => {
    if (err) {
      console.error("❌ MySQL connection failed: ", err.message);
      return;
    }
    console.log("✅ Connected to MySQL database!");
  });
}

module.exports = connectMySQL;
