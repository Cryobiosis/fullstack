import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { intializeUsers } from '../reducers/userReducer'

const userInfo = () => {

  const id = useParams().id

  const dispatch = useDispatch()

  // Get all users posts on start up
  useEffect(() => {
    dispatch(intializeUsers())
  }, [dispatch])

  // Get all blogs from redux
  const users = useSelector(state => state.users)

  // Filter user
  const userFilter = users.filter(u => u.id === id)
  const user = userFilter[0]
  // console.log('user:', user)

  if (!users) {
    return null
  }

  return (
    <div className="users">
      <h1>{user.name}</h1>
      <h2>Added blogs</h2>
      <ul>
        {user.blogs.map((value, id) =>
          <li key={id}>{value.title}</li>
        )}
      </ul>
    </div>
  )
}

export default userInfo
