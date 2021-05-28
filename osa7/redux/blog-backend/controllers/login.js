const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const config = require('../utils/config')

loginRouter.post('/', async (request, response) => {
  const loggingUser = {
    username: request.body.username,
    password: request.body.password,
  }
  // check login
  const initialUser = await User.findOne({ username: loggingUser.username })
  const passwordCorrect = initialUser === null
    ? false
    : await bcrypt.compare(loggingUser.password, initialUser.passwordHash)
  // if invalidpassword return status 400
  if (!(initialUser && passwordCorrect)) {
    return response.status(401).json({ error: 'wrong username or password' })
  }
  // create token
  const tokenUser = {
    username: initialUser.username,
    id: initialUser._id,
  }
  const token = jwt.sign(tokenUser, config.SECRET)
  // return token and user

  response.status(200).json({
    ...tokenUser,
    token,
  })
})

module.exports = loginRouter
