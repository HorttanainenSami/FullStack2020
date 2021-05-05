const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const config = require('../utils/config')
require('express-async-errors')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.status(200).json(blogs.map((blog) => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  const bodyUrl = request.body.url
  const bodyTitle = request.body.title

  const verification = jwt.verify(request.token, config.SECRET)
  if (!request.token || !verification.id) {
    return response.status(401).json({ error: 'token is missing or invalid' })
  }
  if (!bodyUrl || !bodyTitle) {
    return response.status(400).json({ error: 'url and title is required' })
  }
  // add creator to blog
  const blog = new Blog({
    title: bodyTitle,
    author: request.body.author,
    url: bodyUrl,
    likes: request.body.likes || 0,
    user: verification.id,
  })
  // save blog
  const savedBlog = await blog.save()
  // add blog to user
  const user = await User.findById(verification.id)
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})
blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, config.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token is missing or invalid' })
  }
  const blog = await Blog.findById(request.params.id).populate('user', { username: 1, id: 1 })
  if (!blog) {
    return response.status(404).json({ error: 'Blog with given id is not found' })
  }
  if (blog.user.id !== decodedToken.id) {
    return response.status(401).json({ error: 'you dont have authorization to remove blog' })
  }
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter