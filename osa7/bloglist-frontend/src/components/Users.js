import React from 'react'
import { useSelector } from 'react-redux'

const userList = () => {

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
            <tr key={id}><td>{value.name}</td><td>{value.blogs}</td></tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default userList
