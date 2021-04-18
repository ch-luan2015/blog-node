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
const { createPost, getPostById, postStore } = require("./controller/postController")
const { renderRegister, userStore } = require("./controller/registerController")
const { loginUser } = require("./controller/loginController")
const { logoutUser } = require("./controller/logoutController")
const { authMiddleware } = require("./middleware/authMiddleware")
const { redirectIfAuthenticatedMiddleware } = require("./middleware/redirectIfAuthenticatedMiddleware")
const Singer = require("./models/Singer")

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
app.get("/api/post/:id", getPostById)
app.post("/api/create", createPost);
//  authMiddleware,
//User
app.get("/api/register", redirectIfAuthenticatedMiddleware, renderRegister);
app.post("/api/users/store", redirectIfAuthenticatedMiddleware, userStore);


//Login
// app.get("/api/login", redirectIfAuthenticatedMiddleware, renderLogin);
app.post("/api/login", loginUser);
app.post("/api/logout", logoutUser);
//redirectIfAuthenticatedMiddleware,
//List
app.get("/api/avlist", getAvList);
app.get("/api/uslist", getUsList);


app.use((req, res) => res.send('Error , check agagin'));

app.listen(3000, () => console.log('OK. App listening on port 4000'))

