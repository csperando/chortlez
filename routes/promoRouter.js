const express = require("express");
const bodyParser = require("body-parser");

const promoRouter = express.Router();
promoRouter.use(bodyParser.json());

// default '/promos' path
promoRouter.route("/").all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();

}).get((req, res, next) => {
    res.end("Get all promotions.");

}).post((req, res, next) => {
    res.end("Create new promotion.");

}).put((req, res, next) => {
    res.statusCode = 403;
    res.end("Put not available.");

}).delete((req, res, next) => {
    res.end("Deleting all promotions.");
});

// promo id included in path
promoRouter.route("/:promoId").all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();

}).get((req, res, next) => {
    res.write(`Get promotion: ${req.params.promoId}`);
    res.end();

}).post((req, res, next) => {
    res.statusCode = 403;
    res.end("Post not available.");

}).put((req, res, next) => {
    res.write(`Update promotion: ${req.params.promoId}`);
    res.end();

}).delete((req, res, next) => {
    res.write(`Deleting promotion: ${req.params.promoId}`);
    res.end();

});

module.exports = promoRouter;
