  const notificationReducer = (message = '', action) => { 
    switch (action.type) {
      case 'NEW_NOTIFICATION':
        return action.data.message;
      case 'CLEAR_NOTIFICATION':
        // console.log('reducer clear')
        return false
       default: return message
    }
  }

  export const clearNotification = () => {
    // console.log('clear messages...')
    return async dispatch => {
      dispatch ({
        type: 'CLEAR_NOTIFICATION',
        data: { }
      })
    }
  }

  export const setNotification = (message, timeout) => {

    return async dispatch => {
      setTimeout(() => {
        dispatch(clearNotification())
      }, timeout * 1000)

      dispatch ({
        type: 'NEW_NOTIFICATION',
        data: { message }
      })
    }
  }
  
  export default notificationReducer