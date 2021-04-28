const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../App')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('../tests/test_helper.js')


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.blogs)
})

describe('HTTP GET', () => {
  test('Blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('there are correct sum of blogs', async () => {
    const blogs = await api.get('/api/blogs')

    expect(blogs.body).toHaveLength(helper.blogs.length)
  })

  test('first title is React patterns', async () => {
    const response = await api.get('/api/blogs')

    const content = response.body.map(r => r.title)
    expect(content[0]).toContain('React patterns')
  })

  test('returned document has key:id', async () => {
    const response = await api.get('/api/blogs')
    const firstItem = response.body[0]
    expect(firstItem.id).toBeDefined()
  })
  test('returned document doesnt have key __id', async () => {
    const response = await api.get('/api/blogs')
    const firstBlog = response.body[0]
    expect(firstBlog.__id).not.toBeDefined()
  })
})
describe('HTTP POST', () => {
  test('a valid blog can be added', async () => {
    
    const newBlog = {
      title:'testi',
      author:'bloggaaja',
      url:'http',
      likes: 1
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.blogs.length + 1)

    const content = response.body.map(r => r.author)
    expect(content).toContain('bloggaaja')
  })
  test('a valid blog without likes is added with zero likes', async () => {
    await Blog.deleteMany({})

    const newBlog = {
      title:'testi',
      author:'bloggaaja',
      url:'http'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    
    const content = response.body
    expect(content[0].likes).toBe(0)
  })
  test('a blog without url is not added to db', async () => {
    const invalidBlog = {
      title: 'testi',
      author: 'testi'
    }
    await api
      .post('/api/blogs')
      .send(invalidBlog)
      .expect(400)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.blogs.length)
  })
  test('a blog without title is not added to db', async () => {
    const invalidBlog = {
      author: 'testi',
      url: 'url'

    }
    await api
      .post('/api/blogs')
      .send(invalidBlog)
      .expect(400)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.blogs.length)

  })
})
afterAll(() => {
  mongoose.connection.close()
})
