const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')

blogsRouter.get('/',(req, res,next) => {
    Blog.find({}).then(data => {
            return res.status(200).json(data)
    }).catch(e => {
            //return res.status(500).json({message:`Something went wrong on the server! (${e})`})
            next(e)
    })
})

blogsRouter.post('/',(req, res, next) => {
    const { title, author, url, likes } = req.body

    if(!title || !author || !url || !likes) {
        return res.status(400).json({error:"Complete the title, author, url and likes"})
    }

    const blog = new Blog({
        title,
        author,
        url,
        likes
    })

    blog.save()
        .then(() => res.status(201).json({message:"Blog successfully created!"}))
        .catch(e => next(e)/*res.status(500).json({message:`Something went wrong on the server! (${e})`})*/)
})

module.exports = blogsRouter