import React from 'react'
import { useSelector } from 'react-redux'
//import { useDispatch } from 'react-redux'
//import { setNotification } from '../reducers/notificationReducer'
import { Alert } from '@material-ui/lab'

import {
  Snackbar,
} from '@material-ui/core'
const Notification = () => {

  // Redux with hooks
  const message = useSelector(state => state.notifications.message)
  const type = useSelector(state => state.notifications.type)

  // console.log('message selector state', message)

  const [open, setOpen] = React.useState(true)

  if (message === null) {
    return null
  }
  /*
  const handleClick = () => {
    setOpen(true)
  }*/

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  return (
    <div>
      {/*<Alert severity={type}>
        {message}
        </Alert>*/}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={type}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  )
}
/*
export const setNotification = (message, type, timeout) => {
  const message = useSelector(state => state)

  const type = 'info'
  console.log(message)
  // Redux with hooks
  const notification = useSelector(state => state.notifications)
  console.log(notification)

  if (message === null) {
    return null
  }

  return (
    <div className={type}>
      {notification}
    </div>
  )
}
*/
/*
export const setErrorMessage = (message) => {
  const dispatch = useDispatch()
  dispatch(setNotification(message, 'error'))
}

export const setInfoMessage = (message) => {
  const dispatch = useDispatch()
  dispatch(setNotification(message, 'info'))
}
*/
export default Notification