
const bcrypt = require('bcrypt')
const UsersList = require('../models/UsersList')

const loginUser = (req, res) => {

    console.log("post user", req.body)
    const { username, pass } = req.body;


    UsersList.findOne({ username: username }, (e, user) => {
        if (user) {
            bcrypt.compare(pass, user.pass, (e, same) => {
                if (same) {
                    req.session.userId = user._id;
                    res.send("OK login")
                } else {

                    res.send("Login Faild")
                }
            })
        } else {
            res.send("Login Faild")
        }
    })

}

module.exports = {
    loginUser
}
