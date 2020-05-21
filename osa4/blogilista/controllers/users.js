const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const logger = require('../utils/logger')

/*
usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { content: 1, date: 1 })
  response.json(users.map(u => u.toJSON()))
})*/

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { 'url': 1, 'title': 1, 'author':1, 'id':1 } )
  response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response) => {
  const body = request.body
  // logger.info(body)

  // Title and URL required, with error message
  if (!request.body.password || request.body.password.length === 0) {
    return response.status(400).json({
      error: 'password missing'
    })
  }
  if (!request.body.username || request.body.username.length === 0) {
    return response.status(400).json({
      error: 'username missing'
    })
  }
  if (request.body.password.length < 3 || request.body.username.length < 3) {
    return response.status(400).json({
      error: 'username and password has to be more than 3 chars'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

module.exports = usersRouter