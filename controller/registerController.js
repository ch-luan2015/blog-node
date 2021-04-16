
const UsersList = require("../models/UsersList")



const renderRegister = (req, res) => {

    res.render('register');
}


const userStore = (req, res) => {
    var user = req.body;
    console.log("user", user);
    UsersList.create(user, (e, user) => {
        if (e) return res.redirect("/register");
        res.redirect("/");
    });
}




module.exports = {
    renderRegister,
    userStore,
}

