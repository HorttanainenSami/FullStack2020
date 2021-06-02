const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')

commentsRouter.get('/comments', async (request, response) => {
  const comments = await Comment.find({}).populate('blog', {
    url: 1, title: 1, author: 1, id: 1,
  })
  response.status(200).json(comments.map((comment) => comment.toJSON()))
})
commentsRouter.get('/:id/comments', async (request, response) => {
  const comments = await Comment.find({ blog: request.params.id }).populate('blog', {
    url: 1, title: 1, author: 1, id: 1,
  })
  response.status(200).json(comments.map((comment) => comment.toJSON()))
})

commentsRouter.post('/:id/comments', async (request, response) => {
  const message = request.body.message

  if (!message) {
    return response.status(400).json({ error: 'Message is required' })
  }
  const comment = new Comment({
    message,
    blog: request.params.id,
  })

  const savedComment = await comment.save()
  // save also to blog
  const blog = await Blog.findById(request.params.id)
  blog.comments = blog.comments.concat(comment._id)
  await blog.save()
  return response.status(201).json(savedComment)
})
commentsRouter.delete('/:id/comments', async (request, response) => {
  const comments = await Comment.deleteMany({ blog: request.params.id })
  return response.status(200).end()
})

module.exports = commentsRouter
