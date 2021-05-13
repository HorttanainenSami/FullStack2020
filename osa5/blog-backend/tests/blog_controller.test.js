const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper.js')
const app = require('../App')
const config = require('../utils/config')

const api = supertest(app)
let tokenSami
let tokenJoni

beforeAll(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('asd', 10)
  const sami = new User({
    username: 'sami',
    name: 'sami',
    passwordHash,
  })
  const joni = new User({
    username: 'joni',
    name: 'joni',
    passwordHash,
  })
  await sami.save()
  await joni.save()
  const initialSami = await User.findOne({ username: sami.username })
  const initialJoni = await User.findOne({ username: joni.username })
  const samiToken = {
    username: initialSami.username,
    id: initialSami._id,
  }
  const joniToken = {
    username: initialJoni.username,
    id: initialJoni._id,
  }
  tokenSami = 'Bearer '.concat(jwt.sign(samiToken, config.SECRET))
  tokenJoni = 'Bearer '.concat(jwt.sign(joniToken, config.SECRET))
})

describe('one blog added to initialBlogs', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    const blog1 = {
      title: 'asd1',
      author: 'asd1',
      url: 'asd1',
    }
    await api
      .post('/api/blogs')
      .set('Authorization', tokenSami)
      .send(blog1)
  })

  test('Blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('there are correct sum of blogs', async () => {
    const blogs = await api.get('/api/blogs')

    expect(blogs.body).toHaveLength(1)
  })

  test('first title is asd1', async () => {
    const response = await api.get('/api/blogs')

    const content = response.body.map(r => r.title)
    expect(content[0]).toContain('asd1')
  })

  test('returned document has key id', async () => {
    const response = await api.get('/api/blogs')
    const firstItem = response.body[0]
    expect(firstItem.id).toBeDefined()
  })
  test('returned document doesnt have key __id', async () => {
    const response = await api.get('/api/blogs')
    const firstBlog = response.body[0]
    expect(firstBlog.__id).not.toBeDefined()
  })
  test('deleting successfully when id is valid and valid token', async () => {
    const initialBlogs = await api.get('/api/blogs')
    const firstBlogId = initialBlogs.body[0].id

    await api
      .delete(`/api/blogs/${firstBlogId}`)
      .set('Authorization', tokenSami)
      .expect(204)
    const blogs = await api.get('/api/blogs')
    expect(blogs.body).toHaveLength(initialBlogs.body.length - 1)
  })
  test('deleting fails when id is malformatted', async () => {
    const initialBlogs = await api.get('/api/blogs')

    await api
      .delete('/api/blogs/1234')
      .set('Authorization', tokenSami)
      .expect(400)

    const blogs = await api.get('/api/blogs')
    expect(blogs.body).toHaveLength(initialBlogs.body.length)
  })
  test('deleting with not existant id doesnt remove from list', async () => {
    const initialBlogs = await api.get('/api/blogs')
    const firstBlogId = initialBlogs.body[0].id

    await api
      .delete(`/api/blogs/${firstBlogId}`)
      .set('Authorization', tokenSami)
      .expect(204)

    await api
      .delete(`/api/blogs/${firstBlogId}`)
      .set('Authorization', tokenSami)
      .expect(404)
    const blogs = await api.get('/api/blogs')
    expect(blogs.body).toHaveLength(initialBlogs.body.length - 1)
  })
  test('deleting blog what is not created by user returns 401', async () => {
    const initialBlogs = await api.get('/api/blogs')
    const blogId = initialBlogs.body[0].id
    await api
      .delete(`/api/blogs/${blogId}`)
      .set('Authorization', tokenJoni)
      .expect(401)
    const initialBlogsAfter = await api.get('/api/blogs')
    expect(initialBlogsAfter.body).toHaveLength(initialBlogs.body.length)
  })
    // deleting without token doesnt work
  test('deleting blog without token returns status 401', async () => {
    const initialBlogs = await api.get('/api/blogs')
    const blogId = initialBlogs.body[0].id
    console.log('poo')
    await api
      .delete(`/api/blogs/${blogId}`)
      .expect(401)
    console.log('poo2')
    const blogsAfter = await api.get('/api/blogs')
    expect(blogsAfter.body).toHaveLength(initialBlogs.body.length)
  })
  test('a valid blog can be added', async () => {
    const initialBlogs = await api.get('/api/blogs')
    const newBlog = {
      title: 'testi',
      author: 'bloggaaja',
      url: 'http',
      likes: 1,
    }
    await api
      .post('/api/blogs')
      .set('Authorization', tokenSami)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.body.length + 1)

    const content = response.body.map(r => r.author)
    expect(content).toContain('bloggaaja')
  })
})
describe('list without initialBlogs', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    const blogs = await Blog.find({})
    const user = await User.find({})
  })
  test('a valid blog can be added', async () => {
    const initialBlogs = await api.get('/api/blogs')
    const newBlog = {
      title: 'testi',
      author: 'bloggaaja',
      url: 'http',
      likes: 1,
    }
    await api
      .post('/api/blogs')
      .set('Authorization', tokenSami)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.body.length + 1)

    const content = response.body.map(r => r.author)
    expect(content).toContain('bloggaaja')
  })
  test('a valid blog without likes is added with zero likes', async () => {
    const newBlog = {
      title: 'testi',
      author: 'bloggaaja',
      url: 'http',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', tokenSami)
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
      author: 'testi',
    }
    await api
      .post('/api/blogs')
      .set('Authorization', tokenSami)
      .send(invalidBlog)
      .expect(400)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(0)
  })
  test('a blog without title is not added to db', async () => {
    const invalidBlog = {
      author: 'testi',
      url: 'url'

    }
    await api
      .post('/api/blogs')
      .set('Authorization', tokenSami)
      .send(invalidBlog)
      .expect(400)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(0)
  })
  test('posting with malformatted token causes error and doesnt add blog to list', async () => {
    const validBlog = {
      title: 'title',
      author: 'testi',
      url: 'url',
    }
    await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer adsasdasd')
      .send(validBlog)
      .expect(401)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(0)
  })
  test('posting without token causes error and doesnt add blog to list', async () => {
    const validBlog = {
      title: 'title',
      author: 'testi',
      url: 'url',
    }
    await api
      .post('/api/blogs')
      .send(validBlog)
      .expect(401)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(0)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
