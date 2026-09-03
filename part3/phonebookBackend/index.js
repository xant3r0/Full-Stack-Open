const express = require('express')
const morgan = require('morgan')
const app = express()
const PORT = 3001

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
}))

const getRandomId = () => {
    const maxId = 1e9
    return String(Math.ceil(Math.random() * (maxId + 1)))
}

let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/api/persons',(req,res) => {
    return res.status(200).json(persons)
})

app.get('/info',(req,res) => {
    const date = new Date()
    res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${date.toString()}</p>`)
})

app.get('/api/persons/:id',(req,res) => {
    const searchId = req.params.id
    const person = persons.filter(person => person.id == searchId)
    if(person) {
        return res.status(200).json(person)
    } else {
        return res.status(404).end()
    }
})

app.delete('/api/persons/:id',(req,res) => {
    const deleteId = req.params.id
    const initialLength = persons.length
    persons = persons.filter(person => person.id != deleteId)

    if(initialLength === persons.length) {
        return res.status(404).end()
    } else {
        return res.status(204).end()
    }
})

app.post('/api/persons',(req,res) => {
    const {name,number} = req.body

    if(!name.length && !number.length) {
        return res.status(400).json({error:"The name or number is missing!"})
    }

    const found = persons.find(person => person.name === name)

    if(found) {
        return res.status(400).json({error:"The name must be unique!"})
    } else {
        persons = persons.concat({"id":getRandomId(),"name":name,"number":number})
        return res.status(201).json({message:"Person successfully added!"})
    }
})

app.listen(PORT,() => {
    console.log(`Server started on port ${PORT}`)
})