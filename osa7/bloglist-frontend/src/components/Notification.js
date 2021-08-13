import React from 'react'
import { useSelector } from 'react-redux'

const Notification = ({ message, type }) => {

  // Redux with hooks
  const notification = useSelector(state => state.notifications)

  if (message === null) {
    return null
  }

  return (
    <div className={type}>
      {message}
    </div>
  )
}
export default Notification