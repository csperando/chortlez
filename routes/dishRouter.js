
// this is the example server-side router module from the lecture videos
// for the week one assignment, see promoRoutes.js and leaderRoutes.js

const express = require("express");
const bodyParser = require("body-parser");
const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

// default '/dishes' path
dishRouter.route("/").all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();

}).get((req, res, next) => {
    res.end("Get all dishes.");

}).post((req, res, next) => {
    res.end("Create new dish.");

}).put((req, res, next) => {
    res.statusCode = 403;
    res.end("Put not available.");

}).delete((req, res, next) => {
    res.end("Deleting all dishes.");
});

// dish id is included
dishRouter.route("/:dishId").all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();

}).get((req, res, next) => {
    res.write(`Get dish: ${req.params.dishId}`);
    res.end();

}).post((req, res, next) => {
    res.statusCode = 403;
    res.end("Post not available");

}).put((req, res, next) => {
    res.write(`Update dish: ${req.params.dishId}`);
    res.end();

}).delete((req, res, next) => {
    res.end(`Deleting dish: ${req.params.dishId}`);
});

module.exports = dishRouter;
