
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var passport = require("passport-local-mongoose");

// username and password not required in schema if using passport. Passed as params in routes instead
var userSchema = new Schema({
    admin: {
        type: Boolean,
        default: false
    }
});

userSchema.plugin(passport);

var user = mongoose.model("User", userSchema);
module.exports = user;
