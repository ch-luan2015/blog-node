const Singer = require("../models/Singer")

const path = require('path');


const validMiddleWare = (req, res, next) => {
    if (req.files === null || req.body.title === "") {
        res.send("You need create again")
    }
    next();
}


const createPost = (req, res) => {

    if (req.session.userId) {
        var singer = { ...req.body, "author": "NCL", }

        if (req.files) {
            let image = req.files.image;
            image.mv(path.resolve(__dirname, "../public/upload", image.name), function (err) {
                Singer.create({ ...singer, image: "/upload/" + image.name }, (e, singer) => {
                    res.send("Created Post have Image!")
                })
            })
        } else {
            Singer.create(singer, (e, singer) => {
                res.send("Created Post not Image!")
            })
        };


    } else res.send("You not login");

}


const getPostById = ((req, res) => {

    const id = req.params.id;

    console.log("id req", id);

    Singer.findById(id, function (error, detailSinger) {
        console.log("detailSinger", detailSinger);
        res.send(detailSinger);
    })
})


module.exports = {
    createPost,
    getPostById,
    validMiddleWare
}
