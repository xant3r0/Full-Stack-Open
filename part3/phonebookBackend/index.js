const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const error = require('./middlewares/error')
const People = require('./modules/People.js')
require('dotenv').config()
const app = express()
const PORT = process.env.PORT

morgan.token('person',(req) => {
    if(req.method === 'POST') {
        const {name,number} = req.body
        const person = {"name":name,"number":number}
        return JSON.stringify(person)
    }
})

app.use(express.json()).use(morgan((tokens,req,res) => {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        tokens['person'](req, res)
    ].join(' ')
})).use(cors()).use(express.static('dist'))

app.get('/api/persons',(req,res,next) => {
    People.find({}).then(data => {
        res.status(200).json(data).end()

    }).catch(error => next(error))
})

app.get('/info',(req,res, next) => {
    const date = new Date()
    People.collection.countDocuments().then(count => res.send(`<p>Phonebook has info for ${count} people</p><p>${date.toString()}</p>`))
        .catch(e => next(e))
})

app.get('/api/persons/:id',(req,res,next) => {
    const id = req.params.id
    People.findById(id).then(data => {
        //return res.status(200).json(data)
        return data === null ? res.status(404).json({error:"There isn't such a user with the provided Id!"}) : res.status(200).json(data)
    })//.catch(error => next(error))
})

app.delete('/api/persons/:id',(req,res,next) => {
    const id = req.params.id
    People.findByIdAndDelete(id)
        .then(data => data === null ? res.status(404).json({error:"This note doesnt exist or was already deleted!"}) : res.status(204).end())
        .catch(error => next(error))
})

app.post('/api/persons',(req,res,next) => {
    const {name,number} = req.body

    if(!name.length || number === undefined) {
        return res.status(400).json({error:"The name or number is missing!"})
    }

    const person = new People({
        name:name,
        number:number
    })

    person.save()
        .then(() => res.status(201).json({message:"Person successfully added!",data:person}).end())
        .catch(error => {
            //console.log(error)
            res.status(400).json(error)
            // if(error._message === 'person validation failed') {
            //    res.status(400).json({error:"Person validation failed!"})
            // }
            //next(error)
        })
})

app.put('/api/persons/:id',(req, res, next) => {
    const id = req.params.id
    const newNumber = Number(req.body.number)

    People.findByIdAndUpdate(
        id,
        {number:newNumber},
        { returnDocument:'after', runValidators: true }
    ).then(data => {
        data === null ? res.status(404).json("A note with such Id doesn't exist!") : res.status(200).json(data)
    }).catch(e => next(e))
})

app.use(error)

app.listen(PORT,() => {
    console.log(`Server started on port ${PORT}`)
})