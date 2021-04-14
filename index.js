const express = require('express')
const app = new express()
const ejs = require('ejs')

const bodyParser = require("body-parser")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.raw());


const BlogPost = require("./models/BlogPost")
const Singer = require("./models/Singer")
const UsList = require("./models/UsList")

//Connect DataBase
const mongoose = require('mongoose');
const uri = 'mongodb://localhost/IdolDB';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("ok connect")).catch((e) => console.log(e))

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.get("/create", (req, res) => {
    res.render("create")
})

app.post('/posts/store', (req, res) => {

    var singer = { ...req.body, "author": "NCL", }

    let image = req.files.image;

    image.mv(path.resolve(__dirname, "public/upload, image.name"), function (err) {
        Singer.create(singer, (e, singer) => {
            res.redirect('/')
        })
    })
})

//fetch data from database : use find({},()=>}|)

app.get('/', async (req, res) => {
    const SingerCollection = await Singer.find({});
    res.render('index', {
        SingerCollection: SingerCollection
    });
})

app.get('/about', (req, res) => {
    UsList.find({}).limit(5).exec(function (err, idols) {
        if (err) throw err;
        res.render('about', {
            idols,
        });
    });

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
