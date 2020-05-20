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
blogsRouter.post('/', async (request, response) => {
  /*const blog = new Blog(request.body)
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })*/

  // Set likes to 0 if missing
  if (!request.body.likes) request.body.likes = 0

  const blog = new Blog(request.body)
  const savedBlog = await blog.save()
  // user.notes = user.notes.concat(savedNote._id)
  await blog.save()
  response.status(201)
  response.json(savedBlog.toJSON())

})

module.exports = blogsRouter