require("dotenv").config(); // Cargar variables de entorno desde .env

module.exports = {
  secret: process.env.SECRET_KEY || "default",
  port: process.env.PORT || 3000,
  db: process.env.MONGODB_URI,
  db_test: process.env.TEST_MONGO,
};
