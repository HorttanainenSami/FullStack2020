const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const User = require('../models/user')
const helper = require('./test_helper.js')
const app = require('../App')

const api = supertest(app)

describe('When there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('asd', 10)
    const user = new User({
      username: 'sami',
      name: 'sami',
      passwordHash,
    })
    await user.save()
  })
  test('logging in with a valid user returns status 200 and returns JSON with token and user info', async () => {
    const user = {
      username: 'sami',
      password: 'asd',
    }
    await api.post('/api/login')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('login with wrong user returns status 401', async () => {
    const user = {
      username: 'sam',
      password: 'asd',
    }
    await api.post('/api/login')
      .send(user)
      .expect(401)
  })
  test('login with wrong password returns status 401', async () => {
    const user = {
      username: 'sami',
      password: 'asds',
    }
    await api.post('/api/login')
      .send(user)
      .expect(401)
  })
})
afterAll(() => {
  mongoose.connection.close()
})
