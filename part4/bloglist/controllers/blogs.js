const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')

blogsRouter.get('/',async (req, res,next) => {
    try {
        const blogs = await Blog.find({})
        return res.status(200).json(blogs)
    } catch (e) {
        next(e)
    }
})

blogsRouter.post('/',async (req, res, next) => {
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

    try {
        await blog.save()
        res.status(201).json({blog})
    } catch(e) {
        next(e)
    }

})

module.exports = blogsRouter