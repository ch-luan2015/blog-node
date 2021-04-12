const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Định kiểu types cho đôi tượng
const SingerSchema = new Schema({
    name: String,
    song: String,
    author: String,
    datePosted: {
        type: Date,
        default: new Date(),

    }
})

//Tạo model cho kiểu : tên model và dạng types của nó
const Singer = mongoose.model("singers", SingerSchema);

//Giống export default Name;
module.exports = Singer;
