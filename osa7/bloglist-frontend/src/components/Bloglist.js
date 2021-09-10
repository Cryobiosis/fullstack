import React from 'react'
import Card from 'react-bootstrap/Card'
// import CardGroup from 'react-bootstrap/CardGroup'
import Row from 'react-bootstrap/Row'
import { Link } from 'react-router-dom'

const Bloglist = ( { blogs } ) => {
  return (
    <Row xs={1} md={2} className="">
      {blogs.map(blog =>
        <Card
          key={blog.id}
          className="m-2"
          style={{ width: '18rem' }}
        >
          <Card.Header>{blog.author}</Card.Header>
          <Card.Body>
            <Card.Title><Link to={'/blogs/'+blog.id}>{blog.title}</Link></Card.Title>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Likes {blog.likes}</small>
          </Card.Footer>
        </Card>
      )}
    </Row>
  )
}

export default Bloglist
