import blogsService from '../services/blogs'

// const getId = () => (100000 * Math.random()).toFixed(0)

const blogReducer = (state = [], action) => {
  // console.log('state now: ', state)
  // console.log('action', action)

  switch (action.type) {
  case 'LIKE': {
    const id = action.data.id
    const blogToChange = state.find(n => n.id === id)
    const changedBlog = {
      ...blogToChange,
      likes: blogToChange.likes + 1
    }
    return state.map(ane =>
      ane.id !== id ? ane : changedBlog
    )
  }
  case 'NEW_BLOG': {
    const newblog = {
      title: action.title,
      author: action.author,
      url: action.url,
      likes: 0
    }
    return state.concat(newblog)
    // return { ...state, newblog }
  }
  case 'COMMENT': {
    console.log('COMMENT RE', action.data.updatedBlog)
    const id = action.data.updatedBlog.id
    console.log('COMMENT RE id', id)

    // Backend returns changed blog item
    return state.map(ane =>
      ane.id !== id ? ane : action.data.updatedBlog
    )
  }
  /*case 'REMOVE':
    return action.data.id*/
  case 'INIT_BLOGS':
    return action.data

  default: return state
  }
}

export const likeActionCreator = (changedBlog, id) => {
  // Updte backend first then local redux store
  return async dispatch => {
    const newLike = await blogsService.update(changedBlog, id)
    dispatch({
      type: 'LIKE',
      data: { id }
    })
    console.log(newLike)
  }
}

export const commentActionCreator = (commentObject, id) => {
  // Updte backend first then local redux store
  return async dispatch => {
    const updatedBlog = await blogsService.comment(commentObject, id)
    dispatch({
      type: 'COMMENT',
      data: { updatedBlog }
    })
    console.log(updatedBlog)
  }
}

/*
export const removeActionCreator = (id) => {
  // Updte backend first then local redux store
  return async dispatch => {
    const newLike = await blogsService.remove(id)
    dispatch({
      type: 'REMOVE',
      data: { id }
    })
    console.log(newLike)
  }
}*/

export const newblogActionCreator = content => {
  return async dispatch => {
    const newBlog = await blogsService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: {
        title: content.title,
        author: content.author,
        url: content.url,
        likes: 0,
        // id: generateId()
      }
    })
    console.log(newBlog)
  }
}

export const intializeBlogs = () => {
  return async dispatch => {
    // Get from remote server.. then dispatch, (thunk)
    const blogs = await blogsService.getAll()
    dispatch ({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export default blogReducer