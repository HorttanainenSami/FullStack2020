const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')
require('express-async-errors')

userRouter.get('/', async (request, response) => {
  response.json(await User.find({}).populate('blogs', { url: 1, title: 1, author: 1, id: 1 }))
})

class ValidationError extends Error {
  constructor(message) {
    super(message)
    this.name = 'ValidationError'
  }
}
userRouter.post('/', async (request, response) => {
  const body = request.body
  const saltRound = 10
  if (body.password.length < 3) {
    throw new ValidationError('password is shorter than 3')
  }
  const passwordHash = await bcrypt.hash(body.password, saltRound)
  const newUser = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })
  const savedUser = await newUser.save()
  response.status(201).json(savedUser)
})

module.exports = userRouter
