const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
require('express-async-errors')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const bodyUrl = request.body.url
  const bodyTitle = request.body.title
  const bodyAuthor = request.body.author
  const bodyLikes = request.body.likes
  if (!bodyUrl || !bodyTitle) return response.status(400).end()
  const blog = new Blog({
    title: bodyTitle,
    author: bodyAuthor,
    url: bodyUrl,
    likes: bodyLikes || 0
  })
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})
blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter
