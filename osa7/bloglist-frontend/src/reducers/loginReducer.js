import loginService from '../services/login'
import blogService from '../services/blogs'

const loginReducer = (state = [], action) => {
  // console.log('state now: ', state)
  // console.log('action', action)

  switch (action.type) {
  case 'LOGIN': {
    // token, name, username
    return action.data
  }
  case 'LOGOUT': {
    return false
  }
  default: return state
  }
}

export const loginActionCreator = (username, password) => {
  // Update backend first then local redux store
  return async dispatch => {
    try {
      const user = await loginService.login({
        username, password,
      })
      // console.log('user status in R:', user)
      blogService.setToken(user.token)

      dispatch({
        type: 'LOGIN',
        data: { user }
      })
    } catch (exception) {
      console.log(exception)
      // Return error in promise
      throw new Error('Login failed')
      // return false
    }
  }
}

export const logoutActionCreator = () => {
  return async dispatch => {
    return dispatch({
      type: 'LOGOUT',
      data: { }
    })
  }
}

export default loginReducer