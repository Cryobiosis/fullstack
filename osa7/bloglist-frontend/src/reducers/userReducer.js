import userService from '../services/users'

const userReducer = (state = [], action) => {
  // console.log('state now: ', state)
  // console.log('action', action)

  switch (action.type) {
  case 'INIT_USERS':
    // Why this ...?
    return [...action.data]

  default: return state
  }
}

export const intializeUsers = () => {
  return async dispatch => {
    try {
      // Get from remote server.. then dispatch, (thunk)
      const users = await userService.getAll()
      console.log('user:', users)
      dispatch ({
        type: 'INIT_USERS',
        data: users,
      })
    } catch(error) {
      console.log(error)
      // dispatch(setError(error.response.data.error))
    }
  }
}

export default userReducer