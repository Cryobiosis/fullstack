const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// GET /
blogsRouter.get('/', async (request, response) => {
  /*await Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })*/

  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})

// POST /
blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogsRouter