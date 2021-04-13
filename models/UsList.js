

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UsListSchema = new Schema({
    name: String,
    id: Number,
    images: []
})

const UsList = mongoose.model("uslists", UsListSchema);


module.exports = UsList;
