const redirectIfAuthenticatedMiddleware = (req, res, next) => {
    if (req.session.userId) {
        return res.send('Has Login User') // if user logged in, redirect to home page
    }
    next()
}


module.exports = {
    redirectIfAuthenticatedMiddleware
}
