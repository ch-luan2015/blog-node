const Singer = require("../models/Singer")
const mongoose = require('mongoose');
const uri = 'mongodb://localhost/IdolDB';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });




const getSingerList = async (req, res) => {

    const getSingerList = async () => {
        let SingerMongo = await Singer.find({});
        return SingerMongo;
    }


    const SingerList = await getSingerList();
    res.send(SingerList)
}

module.exports = {
    getSingerList,
};

