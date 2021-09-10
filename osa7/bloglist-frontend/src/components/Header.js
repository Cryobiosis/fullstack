import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { logoutActionCreator } from '../reducers/loginReducer'
import {
  Link,
} from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  IconButton,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import HomeIcon from '@material-ui/icons/Home'

const Header = () => {

  const dispatch = useDispatch()
  const handleLogout = async () => {
    // Redux
    dispatch(logoutActionCreator())
    window.location.reload(false)
  }

  // User data from redux
  const state = useSelector(state => state)
  const user = (state.login.length === 0) ? null : state.login.user

  const useStyles = makeStyles(() => ({
    title: {
      flexGrow: 1,
    },
  }))
  const classes = useStyles()

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <Button color="inherit" component={Link} to="/">
              <HomeIcon />
            </Button>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Button color="inherit" component={Link} to="/blogs">
              blogs
            </Button>
            <Button color="inherit" component={Link} to="/users">
              users
            </Button>
          </Typography>
          {user
            ? <div>
              <em>{user.name} logged in</em> <Button onClick={() => handleLogout()} type="submit">logout</Button>
            </div>
            : <Button color="inherit" component={Link} to="/login">
                login
            </Button>
          }
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header