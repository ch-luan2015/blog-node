

const logoutUser = (req, res) => {
    req.session.destroy(() => {
        res.send("ok logout")
    })
}

module.exports = {
    logoutUser,
}
