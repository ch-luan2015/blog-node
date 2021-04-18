

const UsersList = require("../models/UsersList")


const authMiddleware = (req, res, next) => {

    UsersList.findById(req.session.userId, (e, user) => {
        if (e || !user)
            return res.send("You need login for post")
        next();

    })

}


module.exports = {
    authMiddleware,
}
