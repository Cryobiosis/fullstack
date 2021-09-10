// import { useDispatch } from 'react-redux'
// import { setNotification } from './notificationReducer'

const notificationReducer = (data = '', action) => {
  switch (action.type) {
  case 'NEW_NOTIFICATION':
    // console.log('ac',action)
    return action.data
  case 'CLEAR_NOTIFICATION':
    // console.log('reducer clear')
    return false
  default: return data
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

export const setNotification3 = (message, type, timeout) => {

  console.log('set noti')
  // dispatch(setNotification(message, type, 10))

  console.log(timeout)
  return async dispatch => {
  /* const timeoutID = setTimeout(() => {
      dispatch(clearNotification())
    }, timeout * 1000)*/

    // Cancel other timeouts
    // TODO: This is kludge, it's not quaranteed that timeout id's are increased by int +1
    // clearTimeout(timeoutID -1)

    dispatch ({
      type: 'NEW_NOTIFICATION',
      data: {
        message: message,
        type: type,
      }
    })
  }
}

export const setNotification = (message, type, timeout) => {

  // TODO: Enable timer and use clearNotification

  // return async dispatch => {
  /*const timeoutID = setTimeout(() => {
      dispatch(clearNotification())
    }, timeout * 1000)

    // Cancel other timeouts
    // TODO: This is kludge, it's not quaranteed that timeout id's are increased by int +1
    clearTimeout(timeoutID -1)
    */

  console.log('timeout', timeout)
  // const dispatch = useDispatch()
  return {
    type: 'NEW_NOTIFICATION',
    data: {
      message: message,
      type: type,
    }
  }
}


// Can't use here?
export const setErrorMessage = (message) => {
  // const dispatch = useDispatch()
  return setNotification(message, 'warning')
}

export const setInfoMessage = (message) => {
  return setNotification(message, 'info')
}

export default notificationReducer