// required modules
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const FileStore = require("session-file-store")(session)

const React = import("react");

// network info
const hostname = "127.0.0.1";
const port = process.env.PORT || "3000";

// connect to jokes database
const Jokes = require("./models/jokes");
var database = "JOKES_DB";
const mongodb_password = process.env.MONGODB_PASSWORD || "";
if(mongodb_password == "") {
    // var connectionString = "mongodb://localhost:27017/" + database;
    console.error("DB password not found. Cannot form connection string.");

} else {
    var connectionString = "mongodb+srv://sa:" + mongodb_password + "@cluster0.1lrnz.mongodb.net/" + database;
    const connect = mongoose.connect(connectionString);
    connect.then((db) => {
        console.log(`Successfully connected to ${db.connection.name}`);
    }).catch((error) => {
        console.error(error);
    });

}

// setup express app
const app = express();
app.use(bodyParser.json());

// session
app.use(session({
    name: "Session-id",
    secret: "iAmASecret",
    saveUninitialized: false,
    resave: false,
    store: new FileStore()
}));

// signed cookies
// const secretCookieKey = "12345-12345-12345-12345";
// app.use(cookieParser(secretCookieKey));

// // authorization
// function auth(req, res, next) {
//     // console.log(req.session);
//     if(!req.session.user) {
//         var authHeader = req.headers.authorization;
//         if(!authHeader) {
//             var error = new Error("Authorization required.")
//             res.setHeader("WWW-Authenticate", "Basic");
//             res.statusCode = 401;
//             // console.log("Auth required.");
//             next(error);
//         }
//
//         // "Basic lkajhdflkjashdflkjsd=="
//         var auth = new Buffer(authHeader.split(" ")[1], "base64").toString().split(":");
//         var user = auth[0];
//         var password = auth[1];
//
//         if(user === "admin" && password === "password") {
//             req.session.user = "admin";
//             next();
//         } else {
//             var error = new Error("Authorization required.")
//             res.setHeader("WWW-Authenticate", "Basic");
//             res.statusCode = 401;
//             // console.log("Auth invalid.");
//             next(error);
//         }
//
//     } else {
//         if(req.session.user === "admin") {
//             next();
//
//         } else {
//             var error = new Error("Authorization required.")
//             res.statusCode = 401;
//             // console.log("Cookie invalid.");
//             next(error);
//
//         }
//     }
// }

// app.use(auth);

// routes
const jokeRouter = require("./routes/jokeRouter");
app.use("/jokes", jokeRouter);

const userRouter = require("./routes/userRouter");
app.use("/users", userRouter);

// define default directory path for static pages
app.use(express.static(__dirname + "/public/views"));
app.use((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end();
});

// setup server
const server = http.createServer(app);
server.listen(port, hostname, () => {
    console.log(`Server up http://${hostname}:${port}`);
});
