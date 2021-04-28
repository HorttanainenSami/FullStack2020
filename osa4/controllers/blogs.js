const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
require('express-async-errors')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)

})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url:request.body.url
  })
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

module.exports = blogsRouter
