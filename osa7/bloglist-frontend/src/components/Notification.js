import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
//import { setNotification } from '../reducers/notificationReducer'

const Notification = () => {

  // Redux with hooks
  const message = useSelector(state => state.message)
  const type = useSelector(state => state.type)

  // console.log('message selector state', message)

  if (message === null) {
    return null
  }

  return (
    <div className={type}>
      {message}
    </div>
  )
}

export const setNotification = (message, type, timeout) => {
  const dispatch = useDispatch()

  console.log('set noti')
  dispatch(setNotification(message, type, timeout))

}
/*
const Notification = ({ message, type }) => {
  // const dispatch = useDispatch()
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

export default Notification