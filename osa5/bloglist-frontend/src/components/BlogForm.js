import React, {useState} from 'react' 

const BlogForm = ({ addBlogPost }) => {
  
  const [title,  setTitle]    = useState('')
  const [author, setAuthor]   = useState('')
  const [url,    setUrl]      = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }
 
  const addBlog = (event) => {
    event.preventDefault()
    const blogPost = {
      title:  title,
      author: author,
      url:    url,
    }
    addBlogPost(blogPost)
  
    // TODO: In case error don't clean these..
    setTitle('')
    setAuthor('')
    setUrl('')  
  }
 
    return (
      <form onSubmit={addBlog}>
        <label>
          title:
          <input type="text" name="title" value={title} onChange={handleTitleChange}/>
        </label>
        <label>
          author:
          <input type="text" name="author" value={author} onChange={handleAuthorChange}/>
        </label>
        <label> url:
          <input type="text" name="url" value={url} onChange={handleUrlChange}/>
        </label>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
      )
}

export default BlogForm