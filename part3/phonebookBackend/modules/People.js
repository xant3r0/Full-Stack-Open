const mongoose = require('mongoose')
const path = require('path')
const dns = require('node:dns')
require('dotenv').config({ path:path.resolve('modules','../.env') })

dns.setServers(['8.8.8.8'])

const url = process.env.MONGO_DB_URL
mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 }).then(() => console.log('Connected to server!'))

const personSchema = new mongoose.Schema({
  name: {
    type:String,
    minLength: 3,
    required: true
  },
  number: {
    type:String,
    validate: {
      validator: n => /^(?:\d{2}-\d{6,}|\d{3}-\d{5,})$/.test(n),
      message: props => `${props.value} is not a valid phone number!`
    }
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = new mongoose.model('person',personSchema)

