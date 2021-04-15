const Singer = require("../models/Singer")

const express = require('express')
const path = require('path');


const validMiddleWare = (req, res, next) => {
    if (req.files === null || req.body.title === "") {
        return res.redirect("/create")
    }
    next();
}


const createPost = (req, res) => {
    res.render("create")
}

const postStore = (req, res) => {

    var singer = { ...req.body, "author": "NCL", }
    let image = req.files.image;

    image.mv(path.resolve(__dirname, "../public/upload", image.name), function (err) {
        Singer.create({ ...singer, image: "/upload/" + image.name }, (e, singer) => {
            res.redirect('/')
        })
    })
}



// app.get('/post/:id', (req, res) => {
//     Singer.findById(req.params.id, function (error, detailSinger) {
//         res.render('post', {
//             detailSinger
//         })
//     })
// })


module.exports = {
    createPost,
    postStore,
    validMiddleWare
}
