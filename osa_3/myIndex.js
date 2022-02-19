const http = require('http')

/*
const mongoose = require('mongoose')
//supersalasana00
const password = "supersalasana00"
const url =
    `mongodb+srv://fullstack:${password}@cluster0.3ie7p.mongodb.net/phoneBookApp?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Person = mongoose.model('Person', personSchema)
 */

require('dotenv').config()
const Person = require('./models/note')

const express = require('express')

const {request, response} = require("express");

const morgan = require("morgan");
const app = express()
const cors = require('cors')

app.use(cors())


app.use(express.json())

morgan.token('post', (request) => {
    if (request.method === 'POST') {
        return JSON.stringify(request.body)
    }
    return ''
})

morgan.format('POST', ':method :url :status :res[content-length] - :response-time ms :post')

app.use(morgan("POST"))

app.use(express.static('build'))

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "046-456221",
    },
    {
        id: 2,
        name: "Aku Ankka",
        number: "040-131453",
    },
    {
        id: 3,
        name: "Mikki Hiiri",
        number: "050-345788",
    },
    {
        id: 4,
        name: "Milla Magia",
        number: "010-034567",
    }
]

/*
app.get('/api/persons', (req, res) => {
    console.log(request.body)
    console.log(response)
    console.log(persons)
    res.json(persons)

})
 */


app.get('/api/persons', (request, response) => {
    console.log("persons: ",persons)
    Person.find({}).then(persons => {
        response.json(persons)
    })
})




app.get('/info', (req, res) => {
    const countMaxId = () => {
        return persons.length > 0
            ? Math.max(...persons.map(p => p.id))
            : 0
    }

    const infoPageText = "<h1>Phonebook has info for "+countMaxId()+" people</h1>" +
        "<h2>"+new Date()+"</h2>"

    res.send(infoPageText)
})

app.get('/api/persons/:id', (request, response) => {
    //below was wrong... 1 and '1' type mismatch..
    //const id = request.params.id
    const id = Number(request.params.id)
    const person = persons.find(person => {
        console.log(person.id, typeof person.id, id, typeof id, person.id === id)
        return person.id === id
    })
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
    console.log(person)
    response.json(person)
})

app.delete('/api/persons/:number', (request, response) => {
    const phoneNumber = request.params.number
    persons = persons.filter(person => person.number !== phoneNumber)

    console.log(persons)
    response.status(204).end()
})

/*
app.post('/api/persons', (request, response) => {
    const body = request.body

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    const generateId = () => {
        const generatedId = persons.length > 0
            ? getRandomInt(100)
            : 0
        return generatedId
    }

    let nameInArray = persons.find(element => element.name === body.name)
    console.log("nameinArray: ",nameInArray)

    if (!body.name) {
        return response.status(400).json({
            error: 'name missing...'
        })
    } else if (!body.number) {
        return response.status(400).json({
            error: 'number missing...'
        })
    } else if (nameInArray) {
        return response.status(204).json({
            error: 'name must be unique...'
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)

    console.log(person)
    console.log(body)
    response.json(person)
})
 */
app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({
            error: 'name missing...'
        })
    } else if (!body.number) {
        return response.status(400).json({
            error: 'number missing...'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(savedNote => {
        response.json(savedNote)
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})