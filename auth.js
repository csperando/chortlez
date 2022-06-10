const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const User = require("./models/user");

// if not using mongoose, authenticate needs to be constructed manually
const local = passport.use(new Strategy(User.authenticate()));

exports.local = local;
