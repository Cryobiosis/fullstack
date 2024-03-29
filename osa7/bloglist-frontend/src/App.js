import React, { useEffect } from 'react'
import {
// Link,
  Switch,
  Route,
  // useRouteMatch,
} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import LoginForm      from './components/LoginForm'
import Togglable      from './components/Togglable'
import Blog           from './components/Blog'
import BlogForm       from './components/BlogForm'
import Notification   from './components/Notification'
import Users          from './components/Users'
import User           from './components/User'
import Header         from './components/Header'
import BlogList       from './components/BlogList'
// import BlogCards      from './components/BlogCards'

import blogService    from './services/blogs'
import { intializeBlogs } from './reducers/blogReducer'
import './index.css'
import Container from '@material-ui/core/Container'

const App = () => {

  // const [blogs, setBlogs] = useState([])
  // https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/
  // blogs.sort((a, b) => (a.likes > b.likes) ? -1 : 1)
  const blogFormRef = React.createRef()

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
    const loggedUserJSON = (state.login) ? state.login.user : false

    // Read from redux..
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      if (user) {
        // setUser(user)
        blogService.setToken(user.token)
      }
    }
  }, [])
  /*
  const BlogsList = () => (
    <div className="blogs">
      <ul>
        {blogs.map(blog =>
          <li key={blog.id}><Link  to={'/blogs/'+blog.id}>{blog.title}</Link></li>
        )}
      </ul>
    </div>
  )*/

  const BlogFormToggle = () => (
    <Togglable buttonLabel='new blog post' ref={blogFormRef}>
      <BlogForm />
    </Togglable>
  )

  // const match = useRouteMatch('/users/:id')
  // const note = match ? notes.find(note => note.id === Number(match.params.id)) : null
  // console.log(match)

  return (
    <Container>
      <Header />
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
          {user === null ? ''
            :
            <div>
              {BlogFormToggle()}
            </div>
          }
          {/* Alternative cards layout */}
          {/*<BlogCards blogs={blogs}/>*/}
          <BlogList blogs={blogs}/>
        </Route>
        <Route path="/login">
          <LoginForm></LoginForm>
        </Route>
        <Route path="/">
        </Route>
      </Switch>
    </Container>
  )
}

export default App