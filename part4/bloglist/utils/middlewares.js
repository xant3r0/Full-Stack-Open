const errorHandler = (error, req, res, next) => {
    if(error.message.includes(`Cast to ObjectId failed`)) {
        return res.status(400).json({ error: 'Bad request!' })
    } else if(error.message.includes('E11000 duplicate key error collection')) {
        return res.status(400).json({ error: "Use another username!" })
    } else if(error.message.includes('Unexpected token')) {
        return res.status(400).json({ error: 'Bad request!' })
    }
    res.status(500).json({test:error.message})
}

module.exports = { errorHandler }