import React from 'react'
import { useDispatch } from 'react-redux'
// import PropTypes from 'prop-types'
import { newblogActionCreator } from '../reducers/blogReducer'
// import { setInfoMessage } from '../reducers/notificationReducer'
import { setErrorMessage, setInfoMessage } from '../reducers/notificationReducer'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

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
    <Form onSubmit={addBlog} className="p-3 mb-2 bg-light text-dark" border="1">
      <h2>Create a new blog </h2>
      <div className="form-row align-items-center">
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Blog title" name="title"/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Author</Form.Label>
          <Form.Control type="text" placeholder="Blog author name" name="author"/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>URL</Form.Label>
          <Form.Control type="text" placeholder="https://" name="url"/>
        </Form.Group>
        <div>
          <Button variant="primary" type="submit">create</Button>
        </div>
      </div>
    </Form>
  )
}
/*
BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
}*/
export default BlogForm