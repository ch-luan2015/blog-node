const JavList = require("../models/JavList")
const UsList = require("../models/UsList")

const mongoose = require('mongoose');
const uri = 'mongodb://localhost/IdolDB';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })



async function getUsList(req, res) {

    let uslist = await UsList.find({}).exec();
    res.send(uslist)

}

async function getAvList(req, res) {

    let avlist = await JavList.find({}).exec();
    res.send(avlist)

}



module.exports = {
    getUsList,
    getAvList
}
