import React, { useEffect } from 'react'
import LoginForm      from './components/LoginForm'
import Togglable      from './components/Togglable'
import Blog           from './components/Blog'
import BlogForm       from './components/BlogForm'
import Notification   from './components/Notification'
import Users           from './components/Users'

import blogService    from './services/blogs'
// import loginService   from './services/login'
// import { useSelector, useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { intializeBlogs } from './reducers/blogReducer'
import { logoutActionCreator } from './reducers/userReducer'
import {
  BrowserRouter as Router, Route, // Link, Switch
} from 'react-router-dom'

// import { setErrorMessage, setInfoMessage } from './components/Notification'
// import { createStore } from 'redux'
import './index.css'

const App = () => {

  // const [blogs, setBlogs] = useState([])
  // https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/
  // blogs.sort((a, b) => (a.likes > b.likes) ? -1 : 1)
  const blogFormRef = React.createRef()

  // const store = createStore(notificationReducer)
  const state = useSelector(state => state)
  const blogs = state.blogs
  console.log('state=', state)

  // User data from redux
  const user = (state.users.length === 0) ? null : state.users.user
  // console.log('USER:', user)

  const dispatch = useDispatch()

  const setErrorMessage = (message) => {
    return dispatch(setNotification(message, 'error'))
  }
  const setInfoMessage = (message) => {
    return dispatch(setNotification(message, 'info'))
  }

  // Get all blog posts on start up
  useEffect(() => {
    dispatch(intializeBlogs())
  }, [dispatch])

  const handleLogout = async () => {
    // Redux
    dispatch(logoutActionCreator())
    window.location.reload(false)
  }

  const updateBlogPost = (blogPost, id) => {
    blogService
      .update(blogPost, id)
      .then(returnedBlog => {
        // Reget all blog items from server
        blogService.getAll().then(blogs =>
          // setBlogs( blogs )
          console.log('TODO: setBlogs', blogs)
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
        .remove(id).then(returnedBlog => {
          // No need for own action creator for remove...
          // dispatch(removeActionCreator(id)).then(returnedBlog => {
          setInfoMessage(`blog post '${title}' removed`)
          // Or we could use
          console.log(returnedBlog)
          // Get all blogs again..
          dispatch(intializeBlogs())

          setTimeout(() => {
            setInfoMessage(null)
          }, 5000)
        }).catch(error => {
          console.log(error)
          setErrorMessage(`the blog '${title}' can't be deleted. Error: ${error.response.data.error}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })/*
      blogService
        .remove(id)
        .then(returnedBlog => {
          // Reget all blog items from server
          blogService.getAll().then(blogs =>
            // setBlogs( blogs )
            console.log('TODO: setBlogs', blogs)
          ).then(() => {
            setInfoMessage(`blog post '${title}' removed`)
            // Or we could use
            console.log(returnedBlog)
            setTimeout(() => {
              setInfoMessage(null)
            }, 5000)
          })
        }).catch(error => {
          console.log(error)
          setErrorMessage(`the blog '${title}' can't be deleted. Error: ${error.response.data.error}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })*/
    }
    console.log('delete')
  }

  // Check login information from local storage on start up
  useEffect(() => {
    // console.log('USER:', state.users)
    const loggedUserJSON = (state.users) ? state.users.user : false

    // Read from redux..
    // const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      if (user) {
        // setUser(user)
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
      <BlogForm />
    </Togglable>
  )

  return (
    <div>
      <h2>blogs</h2>
      <div className='messages'>
        <Notification />
      </div>

      {user === null ?
        <LoginForm></LoginForm> :
        <div>
          <p>{user.name} logged in</p><button onClick={() => handleLogout()} type="submit">logout</button>
          <BlogsList updateBlogPost={updateBlogPost} removeBlogPost={removeBlogPost}/>
          {BlogFormToggle()}
        </div>
      }

      <Router>
        <Route path="/users">
          <Users />
        </Route>
      </Router>

    </div>
  )
}

export default App