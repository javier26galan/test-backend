const db = require("./utils/db");
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const auth = require("./auth/index");
const config = require("./utils/config");
const cors = require("cors");

const userRoutes = require("./routes/usersRoutes");
const authRoutes = require("./routes/authRoutes");
const mainRoutes = require("./routes/mainRoutes");
db.connect();

const app = express();
const PORT = config.port;
const SECRET = config.secret;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  })
);

auth.setStrategies();
//Sesion
app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      name: 'session', 
      maxAge: 1000 * 60 * 60,
      httpOnly: false,
      secure: false,
      sameSite: "none",
    },
  })
);
//configuración de passport
app.use(passport.initialize());
app.use(passport.session());

app.use("/", mainRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server listening in PORT: ${PORT}`);
});

module.exports = app;
