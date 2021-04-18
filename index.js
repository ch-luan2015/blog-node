const express = require('express')
const app = new express()
const ejs = require('ejs')
app.set('view engine', 'ejs');
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
const { createPost, postStore } = require("./controller/postController")
const { renderRegister, userStore } = require("./controller/registerController")
const { renderLogin, loginUser } = require("./controller/loginController")
const { logoutUser } = require("./controller/logoutController")
const { authMiddleware } = require("./middleware/authMiddleware")
const { redirectIfAuthenticatedMiddleware } = require("./middleware/redirectIfAuthenticatedMiddleware")
//Connect DataBase
const mongoose = require('mongoose');
const uri = 'mongodb://localhost/IdolDB';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })


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
})

//API
app.get("/", (req, res) => {
    res.send("OK Home!")
});

app.get("/api/singerlist", getSingerList);


//Post
app.get("/create", authMiddleware, createPost);
app.post("/posts/store", authMiddleware, postStore);

//User
app.get("/register", redirectIfAuthenticatedMiddleware, renderRegister);
app.post("/users/store", redirectIfAuthenticatedMiddleware, userStore);


//Login
app.get("/login", redirectIfAuthenticatedMiddleware, renderLogin);
app.post("/login", redirectIfAuthenticatedMiddleware, loginUser);
app.get("/logout", logoutUser);

//About
app.get("/api/avlist", getAvList);
app.get("/api/uslist", getUsList);


app.use((req, res) => res.render('notfound'));

app.listen(3000, () => console.log('OK. App listening on port 4000'))
