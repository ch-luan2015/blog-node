const redirectIfAuthenticatedMiddleware = (req, res, next) => {
    if (req.session.userId) {
        return res.send('Has Login User, Can go HomePage')
    }
    next()
}


module.exports = {
    redirectIfAuthenticatedMiddleware
}
