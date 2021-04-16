const Singer = require("../models/Singer")
const mongoose = require('mongoose');
const uri = 'mongodb://localhost/IdolDB';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("ok home")).catch((e) => console.log(e))




const renderHome = (req, res) => {

    const getSingerList = async () => {
        let SingerMongo = await Singer.find({});
        return SingerMongo;
    }


    getSingerList()
        .then(result => { return result })
        .then(result => {
            let db = [...result];
            res.render('index', {
                SingerCollection: db
            })
        })
        .catch(e => console.log(e))

}

module.exports = {
    renderHome,
};

