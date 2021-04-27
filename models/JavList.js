const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Định kiểu types cho đôi tượng
const JavListSchema = new Schema({
    _id: String,
    name: String,
    images: [],
})

//Tạo model cho kiểu : tên model và dạng types của nó
const JavList = mongoose.model("javs", JavListSchema);

//Giống export default Name;
module.exports = JavList;
