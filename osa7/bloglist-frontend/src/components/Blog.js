import React, { useState } from 'react'
import { likeActionCreator } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import blogService    from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'
import { intializeBlogs } from '../reducers/blogReducer'

const Blog = () =>  {

  const setErrorMessage = (message) => {
    return dispatch(setNotification(message, 'error'))
  }
  const setInfoMessage = (message) => {
    return dispatch(setNotification(message, 'info'))
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
  console.log(updateBlogPost)

  const [full, setShowFull] = useState(false)
  const dispatch = useDispatch()

  const id = useParams().id
  //const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)

  // Filter user
  const blogFilter = blogs.filter(u => u.id === id)
  const blog = blogFilter[0]

  // console.log('blog:', blog)
  if (!blog) return false

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = () => {
    //event.preventDefault()
    const changedBlog = {
      id:     blog.id,
      title:  blog.title,
      author: blog.author,
      url:    blog.url,
      likes:  blog.likes +1,
      user:   blog.user.id,
    }
    /*
    const state = useSelector(state => state)
    const blogToChange = state.find(n => n.id === blog.id)
    const changedBlog = {
      ...blogToChange,
      likes: blogToChange.likes + 1
    }*/
    // Redux
    dispatch(likeActionCreator(changedBlog, blog.id))

    //console.log(blogPost)
    // const copy = [...blog]
    // updateBlogPost(blogPost, blog.id)
  }

  const deleteBlog = () => {
    removeBlogPost({ title: blog.title, id: blog.id })
    // console.log('DELETE: ' + blog.id)
  }

  let likeButton = false
  // 5.15: blogilistan testit, step3 requires test function to use mockup count...
  likeButton = (likeButton) ? likeButton : addLike

  return (
    <div style={blogStyle} data-cy='blog'>
      {blog.title}
      {full === false ?
        <div>
          <button onClick={() => setShowFull(true)} type="submit">show</button>likes {blog.likes}
        </div> :
        <div>
          <p>{blog.author}</p>
          <p>{blog.url}</p>
          <div>likes {blog.likes} <button onClick={() => likeButton() } type="submit">like</button></div>
          <button onClick={() => setShowFull(false)} type="submit">hide</button>
          <button onClick={() => deleteBlog()} type="submit">remove</button>
        </div>
      }
    </div>
  )
}

export default Blog
