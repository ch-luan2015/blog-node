const express = require('express')
const app = new express()
const fileUpload = require('express-fileupload')
const expressSession = require('express-session');
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.raw());
app.use(fileUpload())

//View
const { getSingerList } = require("./controller/homeController")
const { getAvList, getUsList } = require("./controller/aboutController")
const { createPost, getPostById, postStore } = require("./controller/postController")
const { renderRegister, userStore } = require("./controller/registerController")
const { loginUser } = require("./controller/loginController")
const { logoutUser } = require("./controller/logoutController")
const { authMiddleware } = require("./middleware/authMiddleware")
const { redirectIfAuthenticatedMiddleware } = require("./middleware/redirectIfAuthenticatedMiddleware")
const Singer = require("./models/Singer")

//Connect DataBase
const mongoose = require("mongoose");

setTimeout(function () {
    mongoose.connect('mongodb://db:27017/idol_db', { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
}, 60000);


app.use(express.static('public'));

app.use(expressSession({
    secret: "hello cat",
    name: "hello",
    proxy: true,
    resave: true,
    saveUninitialized: true
}));

global.loggedIn = null; // Khai bao kieu global

app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next();
});
//API
app.get("/", (req, res) => {
    res.send("OK Home!")
});

app.get("/api/singer", getSingerList);

//Post
app.get("/api/post/:id", authMiddleware, getPostById)
app.post("/api/create", authMiddleware, createPost);

//User
app.get("/api/register", redirectIfAuthenticatedMiddleware, renderRegister);
app.post("/api/users/store", redirectIfAuthenticatedMiddleware, userStore);

//Login
app.post("/api/login", redirectIfAuthenticatedMiddleware, loginUser);
app.post("/api/logout", redirectIfAuthenticatedMiddleware, logoutUser);
//List
app.get("/api/av", getAvList);
app.get("/api/us", getUsList);


app.use((req, res) => res.send('Error , check agagin'));

app.listen(3000, () => { });

module.exports = app;

