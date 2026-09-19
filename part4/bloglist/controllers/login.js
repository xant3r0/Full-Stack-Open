const loginRouter = require('express').Router()
const config = require('../utils/config.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user.js')

loginRouter.post('/', async (req, res, next) => {
    const { username, password } = req.body

    const user = await User.findOne({ username })

    const passwordCorrect = !user ? false : await bcrypt.compare(password, user.passwordHash)

    if(!passwordCorrect) {
        return res.status(401).json({ error: 'Invalid name or password!' })
    }

    const userForToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(userForToken, config.JWT_SECRET)

    return res.status(200).json({ token, username: user.username, name: user.name })
})

module.exports = loginRouter