require('dotenv').config()

const SERVER_PORT = process.env.SERVER_PORT
const MONGO_DB_URL = process.env.MONGO_DB_URL

module.exports = { SERVER_PORT, MONGO_DB_URL }