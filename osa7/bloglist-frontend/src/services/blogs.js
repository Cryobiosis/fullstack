import axios from 'axios'
//const baseUrl = '/api/blogs'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null
const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const remove = async id => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(baseUrl +'/'+id, config)
  return response.data
}

const update = async (newObject, id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(baseUrl +'/'+id, newObject, config)
  return response.data
}

const comment = async (commentObject, id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl +'/'+id+'/comments/', commentObject, config)
  return response.data
}

export default { getAll, setToken, create, update, remove, comment }