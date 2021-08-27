import React, { useEffect } from 'react'
import LoginForm      from './components/LoginForm'
import Togglable      from './components/Togglable'
import Blog           from './components/Blog'
import BlogForm       from './components/BlogForm'
import Notification   from './components/Notification'
import Users          from './components/Users'
import User           from './components/User'
import Header         from './components/Header'

import {
  Link,
  Switch,
} from 'react-router-dom'

import blogService    from './services/blogs'
// import loginService   from './services/login'
// import { useSelector, useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
// import { setNotification } from './reducers/notificationReducer'
import { intializeBlogs } from './reducers/blogReducer'
// import { logoutActionCreator } from './reducers/loginReducer'
import {
  Route, useRouteMatch // Link, Switch
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
  // console.log('state=', state)

  // User data from redux
  const user = (state.login.length === 0) ? null : state.login.user
  const dispatch = useDispatch()

  // Get all blog posts on start up
  useEffect(() => {
    dispatch(intializeBlogs())
  }, [dispatch])

  // Check login information from local storage on start up
  useEffect(() => {
    // console.log('USER:', state.users)
    const loggedUserJSON = (state.login) ? state.login.user : false

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

  const BlogsList = () => (
    <div className="blogs">
      <ul>
        {blogs.map(blog =>
          /*<Blog key={blog.id} blog={blog} updateBlogPost={updateBlogPost} removeBlogPost={removeBlogPost}/>*/
          <li key={blog.id}><Link  to={'/blogs/'+blog.id}>{blog.title}</Link></li>
        )}
      </ul>
    </div>
  )
  const BlogFormToggle = () => (
    <Togglable buttonLabel='new blog post' ref={blogFormRef}>
      <BlogForm />
    </Togglable>
  )

  const match = useRouteMatch('/users/:id')
  // const note = match ? notes.find(note => note.id === Number(match.params.id)) : null
  console.log(match)

  return (
    <div>
      <Header />
      <h2>blogs app</h2>
      <div className='messages'>
        <Notification />
      </div>
      <Switch>
        <Route path="/users/:id">
          <User />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/blogs/:id">
          <Blog />
        </Route>
        <Route path="/blogs">
          {user === null ? 'foo'
            :
            <div>
              {BlogFormToggle()}
            </div>
          }
          <BlogsList />
        </Route>
        <Route path="/login">
          <LoginForm></LoginForm>
        </Route>
        <Route path="/">
        </Route>
      </Switch>
    </div>
  )
}

export default App