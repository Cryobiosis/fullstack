const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  //console.log(action)
  //console.log(state)
  
  switch (action.type) {
    case 'GOOD':
      const good = { ...state, "good": state["good"] +1 } 
      return good
    case 'OK':
      const ok = { ...state, "ok": state["ok"] +1 } 
      return ok
    case 'BAD':
      const bad = { ...state, "bad": state["bad"] +1 } 
      return bad
    case 'ZERO':
      return initialState
    default: return state
  }
  
}

export default counterReducer