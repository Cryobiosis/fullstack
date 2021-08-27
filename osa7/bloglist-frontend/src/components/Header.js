import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { logoutActionCreator } from '../reducers/loginReducer'
import {
  Link,
} from 'react-router-dom'

const Header = () => {

  const padding = {
    padding: 5
  }

  const dispatch = useDispatch()
  const handleLogout = async () => {
    // Redux
    dispatch(logoutActionCreator())
    window.location.reload(false)
  }

  // User data from redux
  const state = useSelector(state => state)
  const user = (state.login.length === 0) ? null : state.login.user

  return (
    <div>
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/blogs">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        {user === null
          ? <Link style={padding} to="/login">login</Link>
          :
          <div>
            <p>{user.name} logged in</p><button onClick={() => handleLogout()} type="submit">logout</button>
          </div>
        }
      </div>
    </div>
  )
}

export default Header