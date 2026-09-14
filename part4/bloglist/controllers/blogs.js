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

    if(!title || !url) {
        return res.status(400).end()//.json({error:"Complete the title, author, url and likes"})
    }

    const blog = new Blog({
        title,
        author,
        url,
        likes: !likes ? 0 : likes
    })

    try {
        await blog.save()
        res.status(201).json({blog})
    } catch(e) {
        next(e)
    }

})

blogsRouter.delete('/:id', async (req, res, next) => {
    const id = req.params.id
    try {
        const deletedBlog = await Blog.findByIdAndDelete(id)
        if(!deletedBlog) {
            return res.status(404).json({message:'No such blog found!'})
        }
        return res.status(200).json(deletedBlog)
    } catch (e) {
        next(e)
    }
})

module.exports = blogsRouter        //remaining: tests