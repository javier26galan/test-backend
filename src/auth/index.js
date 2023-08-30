const passport = require("passport");
const User = require("../models/user.model")
const resgisterStrategy = require("./register.strategy");

//Serialización t deserializacion del usuario
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return done(null, false, { message: "User not found" });
    }
    done(null, user);
  } catch (error) {
    done(error);
  }
});

const setStrategies = () =>{
    passport.use('local', resgisterStrategy.registerStrategy);
    passport.use("bearer", resgisterStrategy.httpBearerStrategy);
}

module.exports = {setStrategies: setStrategies};