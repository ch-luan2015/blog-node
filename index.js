const express = require('express')
const app = new express()
const ejs = require('ejs')
const fileUpload = require('express-fileupload')
const BlogPost = require("./models/BlogPost")
const UsList = require("./models/UsList")
const Idols = require("./models/JavList")
const bodyParser = require("body-parser")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.raw());
app.use(fileUpload())

const { renderHome } = require("./controller/homeController")

const { createPost, validMiddleWare, postStore } = require("./controller/postController")
const contact = require("./controller/contactController")

//Connect DataBase
const mongoose = require('mongoose');
const uri = 'mongodb://localhost/IdolDB';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("ok connect")).catch((e) => console.log(e))

app.set('view engine', 'ejs')

app.use(express.static('public'))



app.get("/", renderHome);


app.get("/create", createPost)

// app.use(validMiddleWare)
// app.post("/posts/store", validMiddleWare)
app.post("/posts/store", postStore)

app.get("/contact", contact)


app.listen(3000, () => { })
