import React from 'react'
import { Link } from 'react-router-dom'
import {
  Button,
  Card,
  CardContent,
  Typography,
  CardActions,
  Grid,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const BlogCards = ( { blogs } ) => {
  const useStyles = makeStyles({
    root: {
      minWidth: 275,
      margin: '0.5em',
      color: 'inherit',
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  })
  const classes = useStyles()

  return (
    <Grid container spacing={1}>
      <Grid container item xs={12} spacing={3}>
        {blogs.map(blog => (
          <Card key={blog.id} className={classes.root} variant="outlined">
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                {blog.author}
              </Typography>
              <Typography variant="h5" component="h2">
                {/*<Link color="inherit" to={'/blogs/'+blog.id}>{blog.title}</Link>*/}
                {blog.title}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                likes: {blog.likes}
              </Typography>
              <Typography variant="body2" component="p">
                {/* <a href="{blog.url}" target="_blank">{blog.url}</a> */}
                {blog.url}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small"><Link color="inherit" to={'/blogs/'+blog.id}>More info</Link></Button>
            </CardActions>
          </Card>
        ))}
      </Grid>
    </Grid>
  )
}

export default BlogCards
