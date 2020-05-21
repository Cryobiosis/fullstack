const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

// GET /
blogsRouter.get('/', async (request, response) => {
  /*await Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })*/

  const blogs = await Blog.find({}).populate('user', { 'username': 1, 'name': 1, 'id':1 } )
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
  // console.log(request)

  // Set likes to 0 if missing
  if (!request.body.likes) request.body.likes = 0

  // Title and URL required, with error message
  if (!request.body.title || request.body.title.length === 0) {
    return response.status(400).json({
      error: 'title missing'
    })
  }
  if (!request.body.url || request.body.url.length === 0) {
    return response.status(400).json({
      error: 'url missing'
    })
  }
  if (!request.token) {
    return response.status(401).json({ error: 'token missing' })
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title:  request.body.title,
    author: request.body.author,
    url:    request.body.url,
    likes:  request.body.likes,
    user:   user._id
  })

  const blogObject = new Blog(blog)
  const savedBlog = await blogObject.save()
  // user.notes = user.notes.concat(savedNote._id)
  // await blog.save()
  response.status(201)
  response.json(savedBlog.toJSON())

  // Save reference also to user collection
  user.blogs.push(savedBlog._id)
  await user.save()
})

blogsRouter.delete('/:id', async (request, response) => {

  // Get user
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  // Get blog post
  const blog = await Blog.findById(request.params.id)

  // console.log(request.params.id)

  if (!blog) {
    return response.status(404).json({
      error: 'Blog post not found '
    })
  }
  // Check that only user who created blog post can delete it
  if (blog.user._id.toString() !== user.id.valueOf()) {
    return response.status(401).json({
      error: 'user not a post creator'
    })
  }

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

// Update blog post
blogsRouter.put('/:id', async (request, response) => {

  const blog = {
    title: request.body.title,
    likes: request.body.likes
  }
  // TODO: Add rest of options..

  const savedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(201)
  response.json(savedBlog.toJSON())
})

module.exports = blogsRouter