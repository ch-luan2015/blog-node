const express = require('express')
const app = new express()
const ejs = require('ejs')

const bodyParser = require("body-parser")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


const BlogPost = require("./models/BlogPost")
//Connect DataBase
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true })

app.set('view engine', 'ejs')

app.use(express.static('public'))


app.get('/', (req, res) => {
    res.render('index')
})

app.get("/posts/new", (req, res) => {
    res.render("create")
})
app.post('/posts/store', (req, res) => {
    console.log(req.body)
    BlogPost.create(req.body, (e, blogpost) => {
        res.redirect('/')

    })
})

app.get('/about', (req, res) => {
    res.render('about');
})
app.get('/contact', (req, res) => {
    res.render('contact');
})
app.get('/post', (req, res) => {
    res.render('post')
})


app.listen(3000, () => { })
