import React from 'react'
import { useSelector } from 'react-redux'
//import { useDispatch } from 'react-redux'
//import { setNotification } from '../reducers/notificationReducer'
import Alert from 'react-bootstrap/Alert'

const Notification = () => {

  // Redux with hooks
  const message = useSelector(state => state.notifications.message)
  const type = useSelector(state => state.notifications.type)

  // console.log('message selector state', message)

  if (message === null) {
    return null
  }

  return (
    <Alert variant={type}>
      {message}
    </Alert>
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