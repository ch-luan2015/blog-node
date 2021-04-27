const Singer = require("../models/Singer")
const mongoose = require('mongoose');

mongoose.connect("mongodb://db:27017/idol_db", { useNewUrlParser: true, useUnifiedTopology: true });

const getSingerList = async (req, res) => {

    const singer = await Singer.find({});
    res.send(singer);
}

module.exports = {
    getSingerList,
};


