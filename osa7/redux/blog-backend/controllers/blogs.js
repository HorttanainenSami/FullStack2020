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
  await Blog.populate(savedBlog, { path: 'user', select: 'username name id' })
  // add blog to user
  request.user.blogs = request.user.blogs.concat(savedBlog._id)
  await request.user.save()
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
  request.user.blogs = request.user.blogs
    .filter(initialBlog => initialBlog.id !== request.params.id)
  await request.user.save()
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, config.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token is missing or invalid' })
  }
  const blog = await Blog.findById(request.params.id).populate('user', { username: 1, id: 1 })
  if (!blog) {
    return response.status(404).json({ error: 'Blog with given id is not found' })
  }
  const user = await User.findById(decodedToken.id).populate('blogs', { title: 1, id: 1 })
  if (!user) {
    return response.status(401).json({ error: 'you dont have authorization to update blog' })
  }
  if (!request.body.url || !request.body.title) {
    return response.status(400).json({ error: 'url and title is required' })
  }
  // add creator to blog
  const newblog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user: request.body.user,
    _id: request.params.id,
  })
  // update blog
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newblog, { new: true })
  await Blog.populate(updatedBlog, { path: 'user', select: 'username name id' })
  response.status(200).json(updatedBlog)
})

module.exports = blogsRouter
