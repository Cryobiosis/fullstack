const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

// TODO: Move somewhere?
const initialBlogs = [ { _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0 }, { _id: "5a422aa71b54a676234d17f8", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5, __v: 0 }, { _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0 }, { _id: "5a422b891b54a676234d17fa", title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10, __v: 0 }, { _id: "5a422ba71b54a676234d17fb", title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0, __v: 0 }, { _id: "5a422bc61b54a676234d17fc", title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2, __v: 0 } ]

describe('Blog posts REST API tests', () => {

  test('Initialize (test) DB with 2 blog posts', async () => {
    // Reset mongo db and save 2 blog entries to mongo db
    beforeEach(async () => {

      await Blog.deleteMany({})

      let blogObject = new Blog(initialBlogs[0])
      await blogObject.save()

      blogObject = new Blog(initialBlogs[1])
      await blogObject.save()

      //await Blog.deleteMany({})
      //await Blog.insertMany(intialBlogs)
    })
  })

  describe('when there is initially some blog post saved', () => {

    test('blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('blog count match, all post are returned', async () => {

      // Because "ReferenceError: Cannot access 'foo' before initialization" we have to use callback
      // https://rahmanfadhil.com/test-express-with-supertest/
      const foo = await api
        .get('/api/blogs')
        .expect(response => {
          expect(response.status).toBe(200)
          expect(response.body).toHaveLength(2)
        //done()
        })
    })

    test('Blog post containd id field', async () => {
      await api.get('/api/blogs')
        .expect(response => {
          expect(response.status).toBe(200)
          expect(response.body[0].id).toBeDefined()
        //done()
        })
    })
  })

  describe('New blog post', () => {

    test('New blog post is created with POST', async () => {

      const formData = {
        title: 'test',
        author: 'John Doe',
        likes: 25,
        url: 'http://localhost/'
      }

      let count = 0;
      const before = await api.get('/api/blogs')
        .expect(response => {
          expect(response.status).toBe(200)
          //done()
          count = response.body.length
        })

      // POST new blog
      await api.post('/api/blogs')
        .send(formData)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      // Get all blog items again, and check last item title
      const after = await api.get('/api/blogs')
        .expect(response => {
          expect(response.status).toBe(200)
          expect(response.body).toHaveLength(count +1)
          // Last element of array
          expect(response.body[response.body.length-1].title).toEqual(formData.title)

        //done()
        })
    })

    test('If not defined, new blog post likes count is 0', async () => {

      const formData = {
        title: 'test',
        author: 'John Doe',
        //likes: 25,
        url: 'http://localhost/'
      }

      // POST new blog
      await api.post('/api/blogs')
        .send(formData)
        .expect(201)
        .expect('Content-Type', /application\/json/)
        .expect(response => {
          expect(response.body.likes).toEqual(0)
        })
    })

    test('Can\'t create a blog post without title', async () => {

      const formData = {
        // title: 'test',
        author: 'John Doe',
        //likes: 25,
        url: 'http://localhost/'
      }

      // POST new blog
      await api.post('/api/blogs')
        .send(formData)
        .expect(400)
    })

    test('Can\'t create a blog post without url', async () => {

      const formData = {
        // title: 'test',
        author: 'John Doe',
        //likes: 25,
        url: 'http://localhost/'
      }

      // POST new blog
      await api.post('/api/blogs')
        .send(formData)
        .expect(400)
    })
  })

  describe('Delete blog post, with DELETE', () => {
    test('Sucseeds with valid code', async () => {
      // POST new blog
      await api.delete('/api/blogs/5a422a851b54a676234d17f7')
        .expect(204)
    })
  })

  describe('Update post data', () => {
    test('Update post likes with PUT', async () => {
      const formData = {
        // title: 'test',
        // author: 'John Doe',
        likes: 10,
        //url: 'http://localhost/'
      }
      // POST new blog
      await api.put('/api/blogs/5a422aa71b54a676234d17f8')
        .send(formData)
        .expect(201)
        .expect(response => {
          expect(response.body.likes).toEqual(10)
        })
    })
  })

  describe('Users', () => {
    test('Create new user', async () => {
      
    })
  })

})

afterAll(() => {
  mongoose.connection.close()
})