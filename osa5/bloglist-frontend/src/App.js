import React, { useState, useEffect } from 'react'
import Blog           from './components/Blog'
import BlogForm       from './components/BlogForm'
import Notification   from './components/Notification'
import blogService    from './services/blogs'
import loginService   from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const [title,  setTitle]  = useState('')
  const [author, setAuthor]  = useState('')
  const [url,    setUrl]  = useState('')
  
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

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }
  const addBlogPost = (event) => {
    event.preventDefault()
    console.log("add post")

    const blogPost = {
      title:  title,
      author: author,
      url:    url,
    }
    // Create new object with POST
    blogService
      .create(blogPost)
      .then(returnedPerson => {
        // setPersons(persons.concat(returnedPerson))
        // setInfoMessage(`Added ${newName}`)
        
        setInfoMessage(`a new blog '${blogPost.title}' added`)

        // Reset always user input fields
        setTitle('')
        setAuthor('')
        setUrl('')
        // Reget all blog items from server
        blogService.getAll().then(blogs =>
          setBlogs( blogs )
        )
        setTimeout(() => {
          setInfoMessage(null)
        }, 5000) 
    }).catch(error => {
      setErrorMessage(`the blog '${blogPost.title}' can't be created. Error: ${error.response.data.error}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000) 
    })
    
    
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
     <BlogForm
      onSubmit      = {addBlogPost} 
      titleOnChange = {handleTitleChange} 
      authorOnChange= {handleAuthorChange}
      urlOnChange   = {handleUrlChange}
     />
    </div>
  )
}

export default App