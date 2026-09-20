const errorHandler = (error, req, res, next) => {
    if(error.message.includes(`Cast to ObjectId failed`)) {
        return res.status(400).json({ error: 'Bad request!' })
    } else if(error.message.includes('E11000 duplicate key error collection')) {
        return res.status(400).json({ error: "Use another username!" })
    } else if(error.message.includes('Unexpected token')) {
        return res.status(400).json({ error: 'Bad request!' })
    } else if(error.message === 'invalid token' || error.message === 'jwt must be provided') {
        return res.status(401).json({ error: 'Invalid token!'})
    }
    //res.status(500).json({ test:error.message, full:error })

    next()
}

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if(authorization && authorization.startsWith('Bearer ')) {
        req.token = authorization.replace('Bearer ', '')
    }

    next()
}

module.exports = { errorHandler, tokenExtractor }