//este archivo maneja la conexion con la base de datos
const mongoose = require("mongoose");
const config = require("./config");

const DB_URI = config.db;

const connect = async () => {
  try {
    mongoose.connect(`${DB_URI}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to database! :)");
  } catch (err) {
    console.log("Connection to database failed :(");
  }
};

module.exports = {connect};
