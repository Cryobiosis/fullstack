import React, { useEffect } from 'react'
import {
  Link,
} from 'react-router-dom'
import { intializeUsers } from '../reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import Table from 'react-bootstrap/Table'

const userList = () => {

  const dispatch = useDispatch()

  // Get all users posts on start up
  useEffect(() => {
    dispatch(intializeUsers())
  }, [dispatch])

  const users = useSelector(state => state.users)

  if (!users) {
    return null
  }

  return (
    <div>
      <h2>Users</h2>
      <Table stripper border hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((value, id) =>
            <tr key={id}><td> <Link to={'/users/'+value.id}>{value.name}</Link></td><td size="sm">{value.blogs.length}</td></tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default userList
