import React, { useState } from 'react'

const Blog = ({ blog, updateBlogPost, removeBlogPost }) =>  {
  const [full, setShowFull] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const addLike = () => {
    //event.preventDefault()
    const blogPost = {
      id:     blog.id,
      title:  blog.title,
      author: blog.author,
      url:    blog.url,
      likes:  blog.likes +1,
      user:   blog.user.id,
    }
    //console.log(blogPost)
    // const copy = [...blog]
    updateBlogPost(blogPost, blog.id)
  }

  const deleteBlog = () => {
    removeBlogPost({ title: blog.title, id: blog.id })
    // console.log('DELETE: ' + blog.id)
  }

  return (
    <div style={blogStyle}>
      {blog.title}
      {full === false ?
        <div>
          <button onClick={() => setShowFull(true)} type="submit">show</button>
        </div> :
        <div>
          <p>{blog.author}</p>
          <p>{blog.url}</p>
          <div>likes {blog.likes} <button onClick={() => addLike()} type="submit">like</button></div>
          <button onClick={() => setShowFull(false)} type="submit">hide</button>
          <button onClick={() => deleteBlog()} type="submit">remove</button>
        </div>
      }
    </div>
  )
}

export default Blog
