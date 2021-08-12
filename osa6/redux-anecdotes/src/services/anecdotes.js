import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, important: false }
  const response = await axios.post(baseUrl, object)
    return response.data
}

// FIXME: Bug when creating new anacdotes, when ID missing, we can't vote..
const newVote = async (id, votes) => {
  console.log('newvote:', id, votes)
  const object = { votes: votes }
  // FIXME: Really backend should make vote increase...
  const response = await axios.patch(baseUrl+'/'+id, object)
    return response.data
}

export default { 
  getAll,
  createNew,
  newVote,
}