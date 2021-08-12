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
      const timeoutID = setTimeout(() => {
        dispatch(clearNotification())
      }, timeout * 1000)

      // Cancel other timeouts
      // TODO: This is kludge, it's not quaranteed that timeout id's are increased by int +1
      clearTimeout(timeoutID -1);

      console.log('timeoutID', timeoutID)
      dispatch ({
        type: 'NEW_NOTIFICATION',
        data: { message }
      })
    }
  }
  
  export default notificationReducer