const filterReducer = (filter = '', action) => {
  console.log('F: state now: ', filter)
  console.log('F: action', action)

  switch (action.type) {

    case 'NEW_FILTER':
      return action.data.filter; 
  
     default: return filter
  }
}

export const filterActionCreator = (filter) => {
   
  return {
    type: 'NEW_FILTER',
    data: { filter }
  }
}

export default filterReducer