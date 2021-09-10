import React from 'react'
import { Link } from 'react-router-dom'
import {
// Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@material-ui/core'

const BlogList = ( { blogs } ) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {blogs.map(blog => (
            <TableRow key={blog.id}>
              <TableCell>
                <Link to={'/blogs/'+blog.id}>{blog.title}</Link>
              </TableCell>
              <TableCell>
                {blog.author}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default BlogList
