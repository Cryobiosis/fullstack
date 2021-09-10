/* eslint-disable no-unused-vars */
import React from 'react'
// import PropTypes from 'prop-types'

// TODO: Redux
import { loginActionCreator } from '../reducers/loginReducer'
import { useDispatch } from 'react-redux'
import { setErrorMessage, setInfoMessage } from '../reducers/notificationReducer'
// import blogService from '../services/blogs'
import {
  TextField,
  Button,
} from '@material-ui/core'

const LoginForm = () => {
  const dispatch = useDispatch()

  const loginOK = () => {
    dispatch(setInfoMessage('Logged in'))
    // blogService.setToken(user.token)
    // history.push('/')

    // TODO: Use timeout in reducer!
    /*setTimeout(() => {
      dispatch(setInfoMessage(''))
    }, 5000)*/
  }

  const loginFailed = () => {
    dispatch(setErrorMessage('wrong credentials'))
    // TODO: Use timeout in reducer!
    /*setTimeout(() => {
      dispatch(setErrorMessage(null))
    }, 5000) */
  }

  const login = async (event) => {
    event.preventDefault()
    // Dispatch returns promise
    dispatch(loginActionCreator(event.target.username.value, event.target.password.value))
      .then(loginOK)
      .catch(loginFailed)
  }

  return (
    <div className="loginform">
      <h2> Login </h2>
      <form onSubmit={login}>
        <div>
          <TextField variant="outlined" label="username" name="username"/>
        </div>
        <div>
          <TextField variant="outlined" label="password" type='password' name="password" />
        </div>
        <Button variant="contained" color="primary" type="submit">login</Button>
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
