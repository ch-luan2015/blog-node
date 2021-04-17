
const bcrypt = require('bcrypt')
const UsersList = require('../models/UsersList')

const renderLogin = (req, res) => {
    res.render("login")
}

const loginUser = (req, res) => {

    const { username, pass } = req.body;

    UsersList.findOne({ username: username }, (e, user) => {
        if (user) {
            bcrypt.compare(pass, user.pass, (e, same) => {
                if (same) {
                    req.session.userId = user._id;
                    res.redirect("/")
                } else {

                    res.redirect("/login")
                }
            })
        } else {
            res.redirect("/login")
        }
    })

}

module.exports = {
    renderLogin,
    loginUser
}
