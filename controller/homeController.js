const Singer = require("../models/Singer")
const mongoose = require('mongoose');
const uri = 'mongodb://localhost/IdolDB';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });




const getSingerList = (req, res) => {

    // const getSingerList = async () => {
    //     let SingerMongo = await Singer.find({});
    //     return SingerMongo;
    // }
    let SingerMongo = Singer.find({});
    console.log("SingerMongo", SingerMongo)
    // const SingerList = await getSingerList();
    res.send(SingerMongo)
}

module.exports = {
    getSingerList,
};

