

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Định kiểu types cho đôi tượng
const BlogPostSchema = new Schema({
    title: String,
    body: String,
})

//Tạo model cho kiểu : tên model và dạng types của nó
const BlogPost = mongoose.model("BlogPosts", BlogPostSchema);

//Giống export default Name;
module.exports = BlogPost;
