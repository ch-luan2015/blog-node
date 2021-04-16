

const UsersList = require("../models/UsersList")


const authMiddleware = (req, res, next) => {

    UsersList.findById(req.session.userId, (e, user) => {
        if (e || !user)
            return res.redirect("/")
        next();

    })

}


module.exports = {
    authMiddleware,
}
