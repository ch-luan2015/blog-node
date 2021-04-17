

const logoutUser = (req, res) => {

    req.session.destroy(() => {
        res.redirect("/")
    })

}


module.exports = {
    logoutUser,
}
