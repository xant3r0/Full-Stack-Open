const errorHandler = (error, req, res, next) => {
    res.status(500).json({test:error})
}

module.exports = { errorHandler }