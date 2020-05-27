import React, {useState} from 'react'
import Togglable from '../components/Togglable'

const Blog = ({ blog }) =>  {

  const [full, setShowFull] = useState(false)

  const blogRef = React.createRef()
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  return (
  <div style={blogStyle}>
    {blog.title}

    {full === false ?
      <div>
        <button onClick={() => setShowFull(true)} type="submit">show</button>
      </div> : 
      <div>
        <p>{blog.author}</p>
        <p>{blog.url}</p>
        <div>likes TODO: <button onClick={() => console.log('TODO: like')} type="submit">like</button></div>
        <button onClick={() => setShowFull(false)} type="submit">hide</button>

      </div>
    }

  </div>
)}

export default Blog
