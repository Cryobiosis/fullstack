import React from 'react'
// import { useSelector } from 'react-redux'
import { connect } from 'react-redux'

const Notification = (props) => {
  // Redux with hooks
  // const notification = useSelector(state => state.notifications)
  const notification = props.notifications

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  // console.log(state)
  return {
    notifications: state.notifications
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification

// Redux store
// export default Notification