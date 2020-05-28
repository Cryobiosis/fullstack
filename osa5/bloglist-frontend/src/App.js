import React, { useState, useEffect } from 'react'
import LoginForm      from './components/LoginForm'
import Togglable      from './components/Togglable'
import Blog           from './components/Blog'
import BlogForm       from './components/BlogForm'
import Notification   from './components/Notification'
import blogService    from './services/blogs'
import loginService   from './services/login'
import './index.css'

const App = () => {

  const [blogs, setBlogs] = useState([])
  // https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/
  blogs.sort((a, b) => (a.likes > b.likes) ? -1 : 1)

  const [username,    setUsername]      = useState('')
  const [password,    setPassword]      = useState('')
  const [infoMessage, setInfoMessage]   = useState(null)
  const [errorMessage,setErrorMessage]  = useState(null)
  const [user,        setUser]          = useState(null)
  const blogFormRef = React.createRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      // Save token to browsers local storage
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  // Get all blog posts on start up
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  const handleLogout = async () => {
    window.localStorage.setItem('loggedBlogUser', null)
    //blogService.setToken(null)
    // setUser(null)
    // Reload window
    window.location.reload(false)
  }

  const addBlogPost = (blogPost) => {
    // NOTE: This should be inside blogService, but then blogFormRef is not found...
    // This will close form always, also in errors...
    blogFormRef.current.toggleVisibility()

    // Create new object with POST
    blogService
      .create(blogPost)
      .then(returnedBlog => {
        // setPersons(persons.concat(returnedPerson))
        // setInfoMessage(`Added ${newName}`)
        setInfoMessage(`a new blog '${blogPost.title}' added`)

        // Hide form
        // blogFormRef.current.toggleVisibility()

        // Reget all blog items from server
        blogService.getAll().then(blogs =>
          setBlogs( blogs )
        )
        // Or we could use returnedBlog...
        console.log(returnedBlog)
        setTimeout(() => {
          setInfoMessage(null)
        }, 5000)
      }).catch(error => {
        console.log(error)
        setErrorMessage(`the blog '${blogPost.title}' can't be created. Error: ${error.response.data.error}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const updateBlogPost = (blogPost, id) => {
    blogService
      .update(blogPost, id)
      .then(returnedBlog => {
        // Reget all blog items from server
        blogService.getAll().then(blogs =>
          setBlogs( blogs )
        ).then(() => {
          setInfoMessage(`blog post '${blogPost.title}' updated`)
          // Or we could use
          // console.log(returnedBlog)
          // setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
          // setBlogs([])
          console.log(returnedBlog)
          setTimeout(() => {
            setInfoMessage(null)
          }, 5000)
        })
      }).catch(error => {
        console.log(error)
        setErrorMessage(`the blog '${blogPost.title}' can't be updated. Error: ${error.response.data.error}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    console.log('update')
  }

  const removeBlogPost = ({ title, id }) => {
    if (window.confirm(`Remove blog '${title}' ?`)) {
      blogService
        .remove(id)
        .then(returnedBlog => {
          setInfoMessage(`blog post '${title}' removed`)
          // Reget all blog items from server
          blogService.getAll().then(blogs =>
            setBlogs( blogs )
          )
          // Or we could use
          console.log(returnedBlog)
          setTimeout(() => {
            setInfoMessage(null)
          }, 5000)
        }).catch(error => {
          console.log(error)
          setErrorMessage(`the blog '${title}' can't be deleted. Error: ${error.response.data.error}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
    console.log('delete')
  }

  // Check login information from local storage on start up
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      if (user) {
        setUser(user)
        blogService.setToken(user.token)
      }
    }
  }, [])

  const BlogsList = ({ updateBlogPost }) => (
    <div className="blogs">
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlogPost={updateBlogPost} removeBlogPost={removeBlogPost}/>
      )}
    </div>
  )

  const BlogFormToggle = () => (
    <Togglable buttonLabel='new blog post' ref={blogFormRef}>
      <BlogForm
        addBlogPost = {addBlogPost}
      />
    </Togglable>
  )

  return (
    <div>
      <h2>blogs</h2>
      <div className='messages'>
        <Notification message={infoMessage}  type='info'/>
        <Notification message={errorMessage} type='error'/>
      </div>

      {user === null ?
        <LoginForm
          handleLogin={handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
        ></LoginForm> :
        <div>
          <p>{user.name} logged in</p><button onClick={() => handleLogout()} type="submit">logout</button>
          <BlogsList updateBlogPost={updateBlogPost} removeBlogPost={removeBlogPost}/>
          {BlogFormToggle()}
        </div>
      }
    </div>
  )
}

export default App