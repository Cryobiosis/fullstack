  const notificationReducer = (message = '', action) => {
    //console.log('N: state now: ', message)
    //console.log('A: action', action)
  
    switch (action.type) {

      case 'NEW_NOTIFICATION':
        
        return action.data.message; // .concat(newAnecdote)
        // return { ...state, newAnecdote } 
    
       default: return message
    }
  }
 
  export const newNotificationActionCreator = (message) => {
     
    return {
      type: 'NEW_NOTIFICATION',
      data: { message }
    }
  }
  
  export default notificationReducer