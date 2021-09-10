import React, { useEffect } from 'react'
import {
  Link,
} from 'react-router-dom'
import { intializeUsers } from '../reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import {
  // Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TableHead,
} from '@material-ui/core'

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
    <div className="users">
      <h2>Users</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={'/users/'+user.id}>{user.name}</Link>
                </TableCell>
                <TableCell align="right">
                  {user.blogs.length}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default userList
