const JavList = require("../models/JavList")
const UsList = require("../models/UsList")

const mongoose = require('mongoose');
const uri = 'mongodb://localhost/IdolDB';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("ok about"))
    .catch((e) => console.log(e))


async function getActress() {

    let javList = await JavList.find({}).exec();

    let usList = await UsList.find({}).exec();

    return { javList, usList }
}

const renderAbout = async (req, res) => {

    let { javList, usList } = await getActress();

    res.render('about', {
        StarData: usList,
        IdolsData: javList
    });
}


module.exports = {
    renderAbout,
}
