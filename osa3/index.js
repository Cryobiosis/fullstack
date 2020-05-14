require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
// const mongoose = require('mongoose')

//const Person = mongoose.model('Person', personSchema)
const Person = require('./models/person')

const app = express()
app.use(express.json())

const cors = require('cors')
app.use(cors())

// Show post request content
// NOTE: Works only with JSON content
morgan.token('post',
  function (req) {
    return JSON.stringify(req.body)
  }
)

// app.use(morgan('tiny'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post'))

/*
// Use express.static files from build instead
app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})*/

// Get all persons
app.get('/api/persons', (req, res) => {
  // res.json(persons)
  Person.find({}).then(result => {
    res.json(result.map(person => person.toJSON()))
  })
  // TODO: Add error handler?
})

app.get('/api/info', (req, res) => {
  // const count = persons.length
  Person.find({})
    .then(result => {
      const count = result.length
      const today = new Date()
      res.send(`<div>Phoenbook has info for ${count} people </div><div>${today}</div>`)
    } )
})

/*
const generateId = () => {
    return Math.floor(Math.random() * Math.floor(1000));
}*/

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  console.log('add new ', body.name)
  if (!body.name || body.name.length === 0) {
    return response.status(400).json({
      error: 'name missing'
    })
  }

  if (!body.number || body.number.length === 0) {
    return response.status(400).json({
      error: 'number missing'
    })
  }

  const person = new Person ({
    name:   body.name,
    number: body.number,
    date:   new Date(),
    // id:     generateId(),
  })

  person.save()
    .then(newPerson => newPerson.toJSON())
    .then(savedAndFormattedPerson => {
      response.json(savedAndFormattedPerson)
    })
    .catch(error => next(error))
})

// Update person
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  console.log('Update person ', request.params.id)

  const person = {
    name:   body.name,
    number: body.number,
    date:   new Date(),
    // id:     generateId(),
  }
  console.log(person)

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person.toJSON())
      } else {
        response.status(404).end()
        console.log('Unable to find person:', request.params.id)
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  // TODO: This should test if person is found..
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// All other files from build folder (front end code)
app.use(express.static('build'))

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
// olemattomien osoitteiden käsittely
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error('errorHandler:', error.message)

  // The request could not be understood by the server due to malformed syntax. The client SHOULD NOT repeat the request without modifications.
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

/*
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}
app.use(requestLogger)
*/