import React                from 'react'
import blogService          from '../services/blogs'
import { likeActionCreator, commentActionCreator } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useParams }        from 'react-router-dom'
import { setNotification }  from '../reducers/notificationReducer'
import { intializeBlogs }   from '../reducers/blogReducer'

import {
  // Container,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
} from '@material-ui/core'
const Blog = () =>  {

  const setErrorMessage = (message) => {
    return dispatch(setNotification(message, 'error'))
  }
  const setInfoMessage = (message) => {
    return dispatch(setNotification(message, 'info'))
  }

  // TODO: Rewrite removeBlogPost to use redux store!
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

  // TODO: Rewrite updateBlogPost to use redux store!
  /*
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
  }*/
  // console.log(updateBlogPost)

  const dispatch = useDispatch()

  // ID from URL
  const id = useParams().id

  // Get all blogs from redux
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
    // Redux
    dispatch(likeActionCreator(changedBlog, blog.id))
  }

  const deleteBlog = () => {
    removeBlogPost({ title: blog.title, id: blog.id })
  }

  const addComment = (event) => {
    event.preventDefault()
    // Redux
    dispatch(commentActionCreator( { comment: event.target.comment.value }, blog.id))
    // Reset form
    event.target.comment.value = ''
  }

  let likeButton = false
  // 5.15: blogilistan testit, step3 requires test function to use mockup count...
  likeButton = (likeButton) ? likeButton : addLike

  return (
    <div style={blogStyle} data-cy='blog'>
      <h1>{blog.title}</h1>
      <div>
        <p>{blog.author}</p>
        <p>{blog.url}</p>
        <div>likes {blog.likes} <Button color="primary" onClick={() => likeButton() } type="submit">like</Button></div>
        <Button color="secondary" onClick={() => deleteBlog()} type="submit">remove</Button>
      </div>
      <h2>Comments</h2>
      <form onSubmit={addComment}>
        <TextField label="comment" name="comment"/>
        <Button variant="contained" color="primary" type="submit">add comment</Button>
      </form>
      <div>
        <List>
          {blog.comments !== undefined && blog.comments.length > 0 ?
            blog.comments.map((value, id) =>
              <ListItem key={id}>
                <ListItemText primary={value.comment}/>
              </ListItem>
            )
            :
            <ListItem>
              <ListItemText
                primary="No comments"
              />
            </ListItem>
          }
        </List>
      </div>
    </div>
  )
}

export default Blog
