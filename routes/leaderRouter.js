const express = require("express");
const bodyParser = require("body-parser");

const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

// default '/leaders' path
leaderRouter.route("/").all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();

}).get((req, res, next) => {
    res.end("Get all leaders.");

}).post((req, res, next) => {
    res.end("Create new leader.");

}).put((req, res, next) => {
    res.statusCode = 403;
    res.end("Put not available.");

}).delete((req, res, next) => {
    res.end("Delete all leaders.");
});

// leader id included in path
leaderRouter.route("/:leaderId").all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();

}).get((req, res, next) => {
    res.end(`Get leader: ${req.params.leaderId}`);

}).post((req, res, next) => {
    res.statusCode = 403;
    res.end("Post not available");

}).put((req, res, next) => {
    res.write(`Update leader: ${req.params.leaderId}`);
    res.end();

}).delete((req, res, next) => {
    res.write(`Delete leader: ${req.params.leaderId}`);
    res.end();

});

module.exports = leaderRouter;
