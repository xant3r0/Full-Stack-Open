const app = require('./app.js')
const config = require("./utils/config");

app.listen(config.SERVER_PORT, () =>  console.log(`Server started on port ${ config.SERVER_PORT }`))