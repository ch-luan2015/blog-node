const express = require('express')
const app = new express()
const ejs = require('ejs')

const bodyParser = require("body-parser")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.raw());


const BlogPost = require("./models/BlogPost")
const Singer = require("./models/Singer")

//Connect DataBase
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/SingerDB', { useNewUrlParser: true, useUnifiedTopology: true })


app.set('view engine', 'ejs')

app.use(express.static('public'))

app.get("/posts/new", (req, res) => {
    res.render("create")
})
app.post('/posts/store', (req, res) => {
    console.log(req.body)
    Singer.create(req.body, (e, singer) => {
        res.redirect('/')

    })
})


//fetch data from database : use find({},()=>}|)

app.get('/', async (request, res) => {
    const SingerCollection = await Singer.find({});
    res.render('index', {
        SingerCollection: SingerCollection
    });
})

app.get('/about', (req, res) => {
    res.render('about');
})
app.get('/contact', (req, res) => {
    res.render('contact');
})
app.get('/post/:id', (req, res) => {
    Singer.findById(req.params.id, function (error, detailSinger) {
        res.render('post', {
            detailSinger
        })
    })
})


app.listen(3000, () => { })
