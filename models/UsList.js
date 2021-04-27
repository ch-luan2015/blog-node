const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsListSchema = new Schema({
    _id: String,
    name: String,
    images: [],
})

const UsList = mongoose.model("uss", UsListSchema);


module.exports = UsList;


