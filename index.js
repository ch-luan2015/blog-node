const express = require('express')
const app = new express()
const ejs = require('ejs')
const fileUpload = require('express-fileupload')

const bodyParser = require("body-parser")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.raw());
app.use(fileUpload())
//Connect DataBase
const mongoose = require('mongoose');
const uri = 'mongodb://localhost/IdolDB';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("ok connect"))
    .catch((e) => console.log(e))

//View
const { renderHome } = require("./controller/homeController")
const { renderAbout } = require("./controller/aboutController")
const { createPost, postStore } = require("./controller/postController")
const { renderRegister, userStore } = require("./controller/registerController")


app.set('view engine', 'ejs')
app.use(express.static('public'))



//API
app.get("/", renderHome);


//Post
app.get("/create", createPost);
app.post("/posts/store", postStore);

//User
app.get("/register", renderRegister);

app.post("/users/store", userStore);


app.get("/about", renderAbout);


app.listen(3000, () => { })
