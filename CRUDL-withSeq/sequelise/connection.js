async function connectMySQL(sequelize) {
  return sequelize
    .authenticate()
    .then(() => {
      console.log("Connection was established successfully");
    })
    .catch((error) => {
      console.log("Unble to connect to the database: ", error);
    });
}

module.exports = connectMySQL;
