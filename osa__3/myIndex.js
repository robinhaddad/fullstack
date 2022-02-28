const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/note')
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(express.json())
app.use(requestLogger)
app.use(cors())
app.use(express.static('build'))

const morgan = require('morgan')

morgan.token('post', (request) => {
  if (request.method === 'POST') {
    return JSON.stringify(request.body)
  }
  return ''
})

morgan.format('POST', ':method :url :status :res[content-length] - :response-time ms :post')

app.use(morgan('POST'))

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '046-456221',
  },
  {
    id: 2,
    name: 'Aku Ankka',
    number: '040-131453',
  },
  {
    id: 3,
    name: 'Mikki Hiiri',
    number: '050-345788',
  },
  {
    id: 4,
    name: 'Milla Magia',
    number: '010-034567',
  }
]

app.get('/api/persons', (request, response) => {
  //console.log("persons: ",persons)
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

  const infoPageText = '<h1>Phonebook has info for '+countMaxId()+' people</h1>' +
        '<h2>'+new Date()+'</h2>'

  res.send(infoPageText)
})

app.get('/api/persons/:id', (request, response, next) => {
  /*
            Person.findById(request.params.id)
            .then(persons => {
            response.json(persons)
            })
     */
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      next(error)
    })
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person
    .findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  /*
        if (!body.name) {
        return response.status(400).json({
            error: 'name missing...'
        })
    } else if (!body.number) {
        return response.status(400).json({
            error: 'number missing...'
        })
    }
     */


  const person = new Person({
    name: body.name,
    number: body.number
  })

  person
    .save()
    .then(savedNote => {
      response.json(savedNote)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const person = { number: body.number }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

// eslint-disable-next-line no-undef
const PORT = process.env.PORT
// eslint-disable-next-line no-undef
console.log('DEBUG:',process.env.PORT)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})