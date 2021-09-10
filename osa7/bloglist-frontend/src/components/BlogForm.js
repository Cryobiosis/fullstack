import React from 'react'
import { useDispatch } from 'react-redux'
// import PropTypes from 'prop-types'
import { newblogActionCreator } from '../reducers/blogReducer'
// import { setInfoMessage } from '../reducers/notificationReducer'
import { setErrorMessage, setInfoMessage } from '../reducers/notificationReducer'
import { makeStyles } from '@material-ui/core/styles'
import {
  TextField,
  Button,
} from '@material-ui/core'

const BlogForm = () => {
  const dispatch = useDispatch()

  const useStyles = makeStyles((theme) => ({

    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
        padding: '0.5em',
      },
    },
  }))
  const classes = useStyles()

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
    <form className={classes.root} onSubmit={addBlog}>
      <h2>Create a new blog</h2>
      <TextField variant="outlined" label="title" name="title"/>
      <TextField variant="outlined" label="author" name="author"/>
      <TextField variant="outlined" label="url" name="url"/>
      <Button variant="contained" color="primary" type="submit">create</Button>
    </form>
  )
}
/*
BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
}*/
export default BlogForm