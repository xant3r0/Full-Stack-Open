const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')
const User = require('../models/user.js')
const middlewares = require('../utils/middlewares.js')

blogsRouter.get('/',async (req, res,next) => {
    try {
        const blogs = await Blog.find({}).populate('user')
        return res.status(200).json(blogs)
    } catch (e) {
        next(e)
    }
})

blogsRouter.post('/', middlewares.tokenExtractor, middlewares.userExtractor, async (req, res, next) => {
    const user = await User.findById(req.user.id)
    const { title, author, url, likes } = req.body
    if(!title || !url) {
        return res.status(400).end().json({error:"Complete the title, author, url and likes"})
    }
    const blog = new Blog({
        title,
        author,
        url,
        user: user.id,
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

blogsRouter.delete('/:id', middlewares.tokenExtractor, middlewares.userExtractor, async (req, res, next) => {
    const id = req.params.id
    try {
        const blogToDelete = await Blog.findById(id)
        if(!blogToDelete) {
            return res.status(404).json({message:'No such blog found!'})
        }
        const blogRealUser = blogToDelete.user.toString()
        if(blogRealUser === req.user.id) {
            const user = await User.findById(req.user.id)
            user.blogs = user.blogs.filter(blog => blog.toString() !== blogToDelete.id)
            await user.save()
            await Blog.findByIdAndDelete(id)
            return res.status(204).end()
        } else  {
            return res.status(401).json({ error: 'Unauthorized!' })
        }
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