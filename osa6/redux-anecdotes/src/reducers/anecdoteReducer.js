import anecdotesService from "../services/anecdotes"

// const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteReducer = (state = [], action) => {
  // console.log('state now: ', state)
  // console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const aneToChange = state.find(n => n.id === id)
      const changedAne = { 
        ...aneToChange, 
        votes: aneToChange.votes + 1
      }
      return state.map(ane =>
        ane.id !== id ? ane : changedAne 
      )
    case 'NEW_ANECDOTE':
      const newAnecdote = {
        content: action.data.content,
        // id: getId(),
        votes: 0
      }
      return state.concat(newAnecdote)
      // return { ...state, newAnecdote } 
    case 'INIT_ANECDOTES':
        return action.data;

    default: return state
  }
}

export const voteActionCreator = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const newAnecdoteActionCreator = content => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: {
        content: content,
        votes: 0,
        // id: generateId()
      }
    })
  }
}

export const intializeAnecdotes = () => {
  return async dispatch => {
    // Get from remote server.. then dispatch..
    const anecdotes = await anecdotesService.getAll()
    dispatch ({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}


export default anecdoteReducer