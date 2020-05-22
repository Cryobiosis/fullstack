import React, { useState, useEffect } from 'react'
import Blog           from './components/Blog'
import Notification   from './components/Notification'
import blogService    from './services/blogs'
import loginService   from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const [infoMessage, setInfoMessage]   = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const [user, setUser] = useState(null)

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

  const handleLogout = async (event) => {
    window.localStorage.setItem('loggedBlogUser', null)
    //blogService.setToken(null)
    // setUser(null)
    // Reload window
    window.location.reload(false);
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

  const loginForm = () => (     
    <div clas="loginform">
      <h2> Login </h2>
      <form onSubmit={handleLogin}>
        <div>username
          <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)}/>
        </div>
        <div>password
          <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)}/>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const blogsForm = () => (
    <div class="blogs">
      <h2>blogs</h2>
      <p>{user.name} logged in</p><button onClick={() => handleLogout()} type="submit">logout</button>

        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
    </div>
  )
  
  return (
    <div>
      <div class="messages">
        <Notification message={infoMessage}  type='info'/>
        <Notification message={errorMessage} type='error'/>
      </div>
      
      {user === null ?
        loginForm() :
        blogsForm()
      }
     
    </div>
  )
}

export default App