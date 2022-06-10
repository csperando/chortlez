
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Users = require("../models/user");

const userRouter = express.Router();
userRouter.use(bodyParser.json());


userRouter.route("/")
.get((req, res, next) => {
    res.statusCode = 200;
    res.write("Get all users.");
    res.end();
});

userRouter.route("/signup")
.post((req, res, next) => {
    res.statusCode = 200;
    res.write("Create a new user.");
    res.end();
});

userRouter.route("/login")
.post((req, res, next) => {
    res.statusCode = 200;
    res.write("Login an existing user.");
    res.end();
});

userRouter.route("/logout")
.get((req, res, next) => {
    res.statusCode = 200;
    res.write("Logout user.");
    res.end();
});

module.exports = userRouter;
