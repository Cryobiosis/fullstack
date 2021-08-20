import React from 'react'
import { useDispatch } from 'react-redux'
// import PropTypes from 'prop-types'
import { newblogActionCreator } from '../reducers/blogReducer'
// import { setInfoMessage } from '../reducers/notificationReducer'
import { setErrorMessage, setInfoMessage } from '../reducers/notificationReducer'

const BlogForm = () => {
  const dispatch = useDispatch()

  const addBlog = async (event) => {
    event.preventDefault()
    const blogPost = {
      title:  event.target.title.value,
      author: event.target.author.value,
      url:    event.target.url.value,
    }
    // addBlogPost(blogPost)
    console.log(blogPost)

    //const newBlog = await blogService.createNew(blogPost)
    dispatch(newblogActionCreator(blogPost)).then(returnedBlog => {
      dispatch(setInfoMessage(`a new blog '${blogPost.title}' added`))
      console.log(returnedBlog)
    }).catch(error => {
      console.log(error)
      dispatch(setErrorMessage(`the blog '${blogPost.title}' can't be created. Error: ${error.response.data.error}`))
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
  }

  return (
    <form onSubmit={addBlog}>
      <label>
        title:
        <input type="text" name="title" />
      </label>
      <label>
        author:
        <input type="text" name="author" />
      </label>
      <label>
        url:
        <input type="text" id="url" name="url" />
      </label>
      <div>
        <button type="submit">create</button>
      </div>
    </form>
  )
}
/*
BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
}*/
export default BlogForm