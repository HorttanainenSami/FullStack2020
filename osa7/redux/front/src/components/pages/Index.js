import React from 'react'
import NewBlog from '../NewBlog'
import { IconButton, ListItemSecondaryAction, List, ListItemText, ListItem, Divider, Paper } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { removeBlog } from '../../reducers/blogs'
import BookIcon from '@material-ui/icons/BookOutlined'
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined'
import { setNotification } from '../../reducers/notification'

const byLikes = (b1, b2) => b2.likes - b1.likes
const Blog = ({ blog, own }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const handleRemove = async () => {
    const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (ok) {
      await dispatch(removeBlog(blog.id))
      dispatch(setNotification('blog removed successfully'))
    }
  }

  const secondaryAction = () => {
    return (
      <IconButton edfe='end' aria-label='remove' onClick={handleRemove}>
        <DeleteForeverOutlinedIcon color='secondary' / >
      </IconButton>
    )
  }
  return (
    <div key={blog.id}>
      <ListItem key={blog.id} button onClick={() => history.push(`/blogs/${blog.id}`)} >
        <BookIcon />
          <ListItemText primary={blog.title} secondary={`written by ${blog.author}`} />
          <ListItemSecondaryAction>
            { own && secondaryAction() }
          </ListItemSecondaryAction>
      </ListItem>
      <Divider variant='fullWidth' />
    </div>
  )
}
const BlogsList = () => {

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  return(
    <div >
      <List component={Paper}>
      {blogs.sort(byLikes).map(blog => 
        <Blog key={blog.id} blog={blog} own={blog.user.id===user?.id} />
      )}
      </List >
    </div>
    )
}

const IndexPage = ({ user }) => {
  return (
    <div>
      {user && <NewBlog /> }
      <BlogsList />
    </div>
  )
}
export default IndexPage

