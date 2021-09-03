import React, { useEffect } from 'react'
import {
  Link,
} from 'react-router-dom'
import { intializeUsers } from '../reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'

const userList = () => {

  const dispatch = useDispatch()
  let table = ''

  // Get all users posts on start up
  useEffect(() => {
    dispatch(intializeUsers())
  }, [dispatch])

  const users = useSelector(state => state.users)

  if (!users) {
    return null
  }

  return (
    <div className="users">
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((value, id) =>
            <tr key={id}><td> <Link to={'/users/'+value.id}>{value.name}</Link></td><td>{value.blogs.length}</td></tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default userList
