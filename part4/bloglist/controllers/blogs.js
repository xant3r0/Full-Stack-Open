const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')
const config = require('../utils/config.js')

blogsRouter.get('/',async (req, res,next) => {
    try {
        const blogs = await Blog.find({}).populate('user')
        return res.status(200).json(blogs)
    } catch (e) {
        next(e)
    }
})

blogsRouter.post('/',async (req, res, next) => {

    const decodedToken = jwt.verify(req.token, config.JWT_SECRET)

    const user = await User.findById(decodedToken.id)

    const { title, author, url, likes } = req.body

    if(!title || !url) {
        return res.status(400).end().json({error:"Complete the title, author, url and likes"})
    }

    const blog = new Blog({
        title,
        author,
        url,
        user: user._id,
        likes: !likes ? 0 : likes
    })

    try {
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        res.status(201).json(savedBlog)
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

blogsRouter.put('/:id', async (req, res, next) => {
    const id = req.params.id
    const { title, author, url, likes } = req.body
    const blogToUpdate = {
        title,
        author,
        url,
        likes
    }

    try {
        const newBlog = await Blog.findByIdAndUpdate(id, blogToUpdate, {
            returnDocument: 'after',
            runValidators: true,
            context: 'query'
        })

        if(!newBlog) {
            return res.status(404).json({message:'No such blog found!'})
        }

        return res.status(200).json(newBlog)
    } catch(e) {
        next(e)
    }
})

module.exports = blogsRouter