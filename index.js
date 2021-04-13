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
const mongoose = require("mongoose");
const mongoDB = 'mongodb://localhost/SingerDB';

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
//Ép Mongoose sử dụng thư viện promise toàn cục
mongoose.Promise = global.Promise;
//Lấy kết nối mặc định


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Polka:lucifer147@cluster0.ljn9n.gcp.mongodb.net/IdolDB?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//     const collection = client.db("test").collection("rom1");
//     client.close();
// });



app.set('view engine', 'ejs')

app.use(express.static('public'))

app.get("/create", (req, res) => {
    res.render("create")
})

app.post('/posts/store', (req, res) => {

    var singer = { ...req.body, "author": "NCL", }

    Singer.create(singer, (e, singer) => {
        res.redirect('/')

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

    var usListNew = UsList.find({}, "name", function (e, data) { }).then((data) => {
        return data

    }).catch((e) => console.log(e));

    res.render('about', {
        us: usListNew
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
