
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var passport = require("passport-local-mongoose");

// username and password not required in schema if using passport. Passed as params in routes instead
var userSchema = new Schema({
    // username: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    // password: {
    //     type: String,
    //     required: true
    // },
    admin: {
        type: Boolean,
        default: false
    }
});

userSchema.plugin(passport);

var user = mongoose.model("User", userSchema);
module.exports = user;
