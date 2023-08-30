// authController.js

const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

exports.login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (req.headers.cookie) {
      cookieID = req.headers.cookie.split("=")[1];
    }
    // console.log("sessionID login", req.session);
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: "Login failed " + info.message });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ message: "Login successful", cookie: cookieID });
    });
  })(req, res, next);
};

exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();
    return res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ message: "Registration failed" });
  }
};

exports.logout = (req, res, next) => {
  console.log("logout", req.session);
  req.logout((err)=>{
    if(err){return next(err)}
  }); // Cerrar sesión utilizando Passport
  res.status(200).json({ message: "Logged out successfully" });
};
