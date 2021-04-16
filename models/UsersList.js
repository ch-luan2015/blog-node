const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');


//Định kiểu types cho đôi tượng
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    pass: {
        type: String,
        required: true,
    }

})

UserSchema.pre('save', function (next) {
    const user = this
    bcrypt.hash(user.pass, 10, (error, hash) => {
        user.pass = hash
        next()
    })
})
//Tạo model cho kiểu : tên model và dạng types của nó
const UsersList = mongoose.model("userlists", UserSchema);

//Giống export default Name;
module.exports = UsersList;
