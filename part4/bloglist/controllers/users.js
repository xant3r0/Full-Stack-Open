const usersRouter = require('express').Router()
const User = require('../models/user.js')
const Blog = require('../models/blog.js')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (req, res, next) => {
    try {
        const users = await User.find({}).populate('blogs')
        return res.status(200).json(users)
    } catch (e) {
        next(e)
    }
})

usersRouter.post('/', async (req, res, next) => {

    const { username, name, password} = req.body

    if((!username || !password) || (username.length < 3 || password.length < 3)) {
        res.status(400).json({error:'Bad request!'})
    }

    const newUser = await new User({
        blogs:[],
        username,
        name,
        passwordHash: await bcrypt.hash(password, 10)
    })

    try {
        const user = await newUser.save()
        return res.status(201).json(user)
    } catch (e) {
        next(e)
    }
})

module.exports = usersRouter
