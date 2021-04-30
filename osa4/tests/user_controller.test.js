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
  test('GET returns json and statuscode 200', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('GET doesnt return passwords of users', async () => {
    const response = await api.get('/api/users')
    const user = response.body[0]
    expect(user.passwordHash).not.toBeDefined()
  })
  test('there is one person in list', async () => {
    const response = await api.get('/api/users')
    const content = response.body
    expect(content).toHaveLength(1)
    const name = content.map(n => n.name)
    expect(name).toContain('sami')
  })
})
describe('When there is not initially users in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })
  test('valid user is added to db', async () => {
    const newUser = {
      username: 'asd',
      name: 'sami',
      password: 'asd',
      blogs: [],
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })
  test('not unique username returns status 400', async () => {
    const newUser = {
      username: 'asd',
      name: 'sami',
      password: 'asd',
      blogs: [],
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })
  test('too short username returns status 400', async () => {
    const newUser = {
      username: 'as',
      name: 'asd',
      password: 'asd',
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })
  test('too short password returns status 400', async () => {
    const newUser = {
      username: 'asd',
      name: 'asd',
      password: 'as',
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })
})
afterAll(() => {
  mongoose.connection.close()
})
