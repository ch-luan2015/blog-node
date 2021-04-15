const express = require('express')
const app = new express()
const ejs = require('ejs')
const fileUpload = require('express-fileupload')
const BlogPost = require("./models/BlogPost")
const Singer = require("./models/Singer")
const UsList = require("./models/UsList")
const Idols = require("./models/JavList")
const bodyParser = require("body-parser")
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.raw());
app.use(fileUpload())



//Connect DataBase
const mongoose = require('mongoose');
const uri = 'mongodb://localhost/IdolDB';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("ok connect")).catch((e) => console.log(e))

app.set('view engine', 'ejs')

app.use(express.static('public'))

validMiddleWare = (req, res, next) => {
    if (req.files === null || req.body.title === "") {
        return res.redirect("/create")
    }
    next();
}

app.use("/create", validMiddleWare)

app.get('/', async (req, res) => {
    const SingerCollection = await Singer.find({});
    res.render('index', {
        SingerCollection: SingerCollection
    });
})

app.get('/about', async (req, res) => {

    const fetchIdols = async () => {
        let temp = await Idols.find({}).exec()
        return temp;
    }

    var IdolsData = await fetchIdols();

    const fetchStar = async () => {
        let temp = await UsList.find({}).exec();
        return temp;
    }

    var StarData = await fetchStar();


    res.render('about', {
        IdolsData, StarData

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

app.get("/create", (req, res) => {
    res.render("create")
})

app.post('/posts/store', (req, res) => {

    var singer = { ...req.body, "author": "NCL", }
    let image = req.files.image;

    image.mv(path.resolve(__dirname, "public/upload", image.name), function (err) {
        Singer.create({ ...singer, image: "/upload/" + image.name }, (e, singer) => {
            res.redirect('/')
        })
    })
})




app.listen(3000, () => { })
