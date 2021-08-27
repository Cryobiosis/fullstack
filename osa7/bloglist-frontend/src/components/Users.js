import React, { useEffect } from 'react'
//import { useSelector } from 'react-redux'
import {
  Link,
} from 'react-router-dom'
// import userService from '../services/users'
import { intializeUsers } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

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

  /*
  // Get all blogs from redux
  const blogs = useSelector(state => state.blogs)
  console.log(blogs)
  // Count users blogs
  let users = []
  let user = null
  blogs.forEach(blog => {
    console.log('blog', blog.user.id)
    user = users.find(u => u.id === blog.user.id)
    if (user) {
      user.blogs++
    } else {
      users.push( { id: blog.user.id, name: blog.user.name, blogs: 1 } )
    }
  })
*/

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
