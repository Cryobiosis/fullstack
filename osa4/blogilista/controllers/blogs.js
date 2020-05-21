const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

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

  // TMP Get fist user
  const users = await User.find({})
  console.log(users)
  const firstID = users[0]._id
  // response.json(users.map(u => u.toJSON()))
  request.body.user = firstID

  const blog = new Blog(request.body)
  const savedBlog = await blog.save()
  // user.notes = user.notes.concat(savedNote._id)
  // await blog.save()
  response.status(201)
  response.json(savedBlog.toJSON())

  // Save reference also to user collection
  users[0].blogs.push(savedBlog._id)
  users[0].save()
})

blogsRouter.delete('/:id', async (request, response) => {
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