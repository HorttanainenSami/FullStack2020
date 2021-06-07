import { setNotification } from '../../reducers/notification'
import { removeBlog, updateBlog, commentBlog } from '../../reducers/blogs'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import useField from '../../hooks/index'
import { TextField, Typography, Link, Button, Paper, List, ListItem, Divider } from '@material-ui/core'

const Blog = ({ user, blog }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [comment, resetComment] = useField('text')
  const id = useParams().id
  if (!blog) {
    return null
  }
  const own = user?.id === blog.user.id 

  const handleLike = async () => {
    const likedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    dispatch(updateBlog(likedBlog))
  }

  const handleRemove = async () => {
    const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (ok) {
        await dispatch(removeBlog(id))
        dispatch(setNotification('blog removed successfully'))
        history.push('/')
    }
  }
  const handleComment = () =>  {
   const messageObject = {
     message: comment.value,
  }
    resetComment()
    dispatch(commentBlog(blog.id, messageObject))
  }
  return (
    <div className='blog' style={{ padding: 10 }}>
      
      <Paper style={{ padding: 10 }}>
        <Typography variant='h4' >
          {blog.title} <i> by {blog.author}</i>
        </Typography>
          <div>
            <Link href={blog.url}>{blog.url}</Link>
          </div>
          <div>
            <Typography variant='subtitles1'>{blog.likes} likes
            {user && <Button variant='outlined' onClick={() => handleLike(blog.id)}>like</Button>}
            </Typography>
          </div>
          <div>
            <Typography variant = 'subtitles1'>added by {blog.user.name}</Typography>
            {own && <Button variant='outlined' onClick={() => handleRemove(blog.id)}>remove</Button>}
        </div>
        <Typography variant='h4'> Comments </Typography>
        <TextField label='comment' {...comment} />
        <Button variant='outlined' onClick={handleComment}>add comment</Button>
        <List component={Paper} >
          {blog.comments.length === 0 ? <ListItem> no comments </ListItem> : 
            blog.comments.map(comment => <span><ListItem key={comment.id}> {comment.message} </ListItem> <Divider /></span>)}
           
        </List>
    </Paper>
   </div>
  )
}
export default Blog
