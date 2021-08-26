import React from 'react'
// import PropTypes from 'prop-types'

// TODO: Redux
import { loginActionCreator } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { setErrorMessage, setInfoMessage } from '../reducers/notificationReducer'
// import blogService from '../services/blogs'

const LoginForm = () => {
  const dispatch = useDispatch()


  const loginOK = () => {
    dispatch(setInfoMessage('Logged in'))
    // blogService.setToken(user.token)

    // TODO: Use timeout in reducer!
    setTimeout(() => {
      dispatch(setInfoMessage(''))
    }, 5000)

  }

  const loginFailed = () => {
    dispatch(setErrorMessage('wrong credentials'))
    // TODO: Use timeout in reducer!
    setTimeout(() => {
      dispatch(setErrorMessage(null))
    }, 5000)
  }

  const login = async (event) => {
    event.preventDefault()
    // Dispatch returns promise
    dispatch(loginActionCreator(event.target.Username.value, event.target.Password.value))
      .then(loginOK)
      .catch(loginFailed)
  }

  return (
    <div className="loginform">
      <h2> Login </h2>
      <form onSubmit={login}>
        <div>username
          <input type="text" name="Username"/>
        </div>
        <div>password
          <input type="password" name="Password"/>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}
/*
LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  // username: PropTypes.string.isRequired,
  // password: PropTypes.string.isRequired
}
*/
export default LoginForm
