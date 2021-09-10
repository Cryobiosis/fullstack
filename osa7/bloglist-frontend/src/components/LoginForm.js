import React from 'react'
// import PropTypes from 'prop-types'

// TODO: Redux
import { loginActionCreator } from '../reducers/loginReducer'
import { useDispatch } from 'react-redux'
import { setErrorMessage, setInfoMessage } from '../reducers/notificationReducer'
// import blogService from '../services/blogs'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

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
      <Form onSubmit={login} className="mb-3">
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="username" name="Username"/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="Password"/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
          <Button variant="primary" type="submit">
              login
          </Button>
        </Form.Group>
      </Form>
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
