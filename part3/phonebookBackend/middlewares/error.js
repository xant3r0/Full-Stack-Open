const errorHandler = (error, req, res, next) =>  {
    const statusCode = error.statusCode || 500
    const jsonError = {error:error.message || 'Internal error'}
    res.status(statusCode).json(jsonError)
    next()
}

module.exports = errorHandler