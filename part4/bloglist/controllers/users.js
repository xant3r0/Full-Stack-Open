const usersRouter = require('express').Router()
const User = require('../models/user.js')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (req, res, next) => {
    try {
        const users = await User.find({})
        return res.status(200).json(users)
    } catch (e) {
        next(e)
    }
})

usersRouter.post('/', async (req, res, next) => {
    const { username, name, password} = req.body
    const newUser = new User({
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
