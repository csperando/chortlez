
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Jokes = require("../models/jokes");

const jokeRouter = express.Router();
jokeRouter.use(bodyParser.json());


jokeRouter.route("/")
.get((req, res, next) => {
    const found = Jokes.find({});
    found.then((jokes) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(jokes);
        res.end();

    }).catch((error) => {
        // console.error(error);
        res.statusCode = 401;
        res.write("Bad request.");
        res.end();
    });

}).post((req, res, next) => {
    const newJoke = Jokes.create(req.body);
    newJoke.then((joke) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(joke);
        res.end();

    }).catch((error) => {
        // console.error(error);
        res.statusCode = 401;
        res.write("Bad request.");
        res.end();
    });

}).put((req, res, next) => {
    res.statusCode = 403;
    res.end("Put not available.");

}).delete((req, res, next) => {
    // Warning: collection.remove is deprecated. Use deleteOne, deleteMany, or bulkWrite instead.
    const deleted = Jokes.remove({});
    deleted.then((response) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
        res.end();

    }).catch((error) => {
        res.statusCode = 401;
        res.write("Bad request.");
        res.end();
    });

});

jokeRouter.route("/:jokeId")
.get((req, res, next) => {
    const found = Jokes.findById(req.params.jokeId);
    found.then((jokes) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(jokes);
        res.end();

    }).catch((error) => {
        // console.error(error);
        res.statusCode = 401;
        res.write("Bad request.");
        res.end();
    });

}).post((req, res, next) => {
    res.statusCode = 403;
    res.write("Post not allowed.");
    res.end();

}).put((req, res, next) => {
    const updated = Jokes.findByIdAndUpdate(req.params.jokeId,
        { $set: req.body },
        { new: true });

    updated.then((joke) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(joke);
        res.end();

    }).catch((error) => {
        // console.error(error);
        res.statusCode = 401;
        res.write("Bad request.");
        res.end();

    });

}).delete((req, res, next) => {
    const deleted = Jokes.findByIdAndRemove(req.params.jokeId);
    deleted.then((response) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
        res.end();

    }).catch((error) => {
        // console.error(error);
        res.statusCode = 401;
        res.write("Bad request.");
        res.end();

    });

});

jokeRouter.route("/:jokeId/comments")
.get((req, res, next) => {
    const found = Jokes.findById(req.params.jokeId);
    found.then((joke) => {
        if(joke != null) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(joke.comments);
            res.end();
        } else {
            res.statusCode = 404;
            res.write("Not found.");
            res.end();
        }

    }).catch((error) => {
        // console.error(error);
        res.statusCode = 401;
        res.write("Bad request.");
        res.end();
    });

}).post((req, res, next) => {
    const found = Jokes.findById(req.params.jokeId);
    found.then((joke) => {
        if(joke != null) {
            joke.comments.push(req.body);
            joke.save().then((joke) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(joke.comments.length);
                res.end();
            }).catch((error) => {
                // console.error(error);
                res.statusCode = 401;
                res.write("Bad Request.");
                res.end();
            });
        } else {
            res.statusCode = 404;
            res.write("Not found.");
            res.end();
        }
    }).catch((error) => {
        // console.error(error);
        res.statusCode = 401;
        res.write("Bad request.");
        res.end();
    });

}).put((req, res, next) => {
    res.statusCode = 403;
    res.end("Put not available.");

}).delete((req, res, next) => {
    const found = Jokes.findById(req.params.jokeId);
    found.then((joke) => {
        if(joke != null) {
            res.statusCode = 200;
            joke.comments = [];
            joke.save().then((joke) => {
                res.setHeader("Content-Type", "application/json");
                res.json(joke.comments);
                res.end();

            }).catch((error) => {
                console.error(error);
                res.end();
            });
        } else {
            res.statusCode = 404;
            res.write("Not found.");
            res.end();
        }

    }).catch((error) => {
        res.statusCode = 401;
        res.write("Bad request.");
        res.end();
    });

});

jokeRouter.route("/:jokeId/comments/:commentId")
.get((req, res, next) => {
    const found = Jokes.findById(req.params.jokeId);
    found.then((joke) => {
        const comment = joke.comments.id(req.params.commentId);
        if(joke != null && comment != null) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(comment);
            res.end();
        } else {
            res.statusCode = 404;
            res.write("Not found.");
            res.end();
        }

    }).catch((error) => {
        console.error(error);
        res.statusCode = 401;
        res.write("Bad request.");
        res.end();
    });

}).post((req, res, next) => {
    res.statusCode = 403;
    res.end("Post not available.");

}).put((req, res, next) => {
    const found = Jokes.findById(req.params.jokeId);
    found.then((joke) => {
        let comment = joke.comments.id(req.params.commentId);
        if(joke != null && comment != null) {
            if(req.body.rating) {
                comment.rating = req.body.rating;
            }
            if(req.body.review) {
                comment.review = req.body.review;
            }

            joke.save().then((joke) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(comment);
                res.end();

            }).catch((error) => {
                res.statusCode = 401;
                res.setHeader("Content-Type", "application/json");
                res.write("Bad request.");
                res.end();

            });

        } else {
            res.statusCode = 401;
            res.setHeader("Content-Type", "application/json");
            res.write("Bad request.");
            res.end();

        }

    }).catch((error) => {
        console.error(error);
        res.end();

    });


}).delete((req, res, next) => {
    const found = Jokes.findById(req.params.jokeId);
    found.then((joke) => {
        let comment = joke.comments.id(req.params.commentId);
        if(joke != null && comment != null) {
            joke.comments.id(req.params.commentId).remove();
            joke.save().then((joke) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(comment);
                res.end();

            }).catch((error) => {
                console.error(error);
                res.statusCode = 401;
                res.setHeader("Content-Type", "application/json");
                res.write("Bad request.");
                res.end();

            });

        } else {
            res.statusCode = 404;
            res.write("Not found.");
            res.end();
        }

    }).catch((error) => {
        // console.error(error);
        res.statusCode = 401;
        res.write("Bad request.");
        res.end();
    });

});

module.exports = jokeRouter;
