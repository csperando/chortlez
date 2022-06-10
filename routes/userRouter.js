
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Users = require("../models/user");
const passport = require("passport");

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
    Users.register(new Users({username: req.body.username}), req.body.password,
        (error, user) => {
            if(error) {
                res.statusCode = 500;
                res.setHeader("Content-Type", "application/json");
                res.json({error: error});
                res.end();
            } else {
                passport.authenticate("local"),
                (req, res) => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json({status: ok, user: user.username});
                };
                res.end();
            }
        });
    // res.end();
});

userRouter.route("/login")
.post(passport.authenticate("local"), (req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({status: ok, user: user.username});
    // res.write({status: ok, user: user.username});
    res.end();
});

userRouter.route("/logout")
.get((req, res, next) => {
    res.statusCode = 200;
    res.write("Logout user.");
    res.end();
});

module.exports = userRouter;
