const LocalStrategy = require("passport-local").Strategy;
const BearerStrategy = require("passport-http-bearer").Strategy;
const CookieStrategy = require("passport-cookie").Strategy;
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const registerStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username: username });

    if (!user) {
      return done(null, false, { message: "Incorrect username" });
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) {
      return done(null, false, { message: "Incorrect password" });
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
});

const httpBearerStrategy = new BearerStrategy((token, done) => {
  User.findOne({ token: token }, function (err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }
    return done(null, user, { scope: "all" });
  });
});

const cookieStrategy = new CookieStrategy(function (token, done) {
  User.findByToken({ token: token }, function (err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  });
});

module.exports = {registerStrategy, httpBearerStrategy, cookieStrategy};
