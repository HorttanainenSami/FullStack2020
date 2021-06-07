import { useParams, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { List, ListItem, Divider, Typography, Paper } from '@material-ui/core'

const User = () => {
  const history = useHistory()
  const users = useSelector(state => state.users)
  const id = useParams().id
  const selectedUser = users.find(user => user.id === id )
  const userData = () => {
    return(
      <div>
        <Typography variant='h4'> {selectedUser.username} </Typography >
        <List component={Paper}>
          <ListItem>
            <Typography variant='subtitle2'>
              Added blogs
            </Typography>
          </ListItem>
          <Divider variant='fullWidth' />
          {selectedUser.blogs.map(blog => (
            <ListItem key={blog.id} button onClick={() => history.push(`/blogs/${blog.id}`)}>
              <Typography variant='subtitle1'>
                {blog.title}
              </Typography>
            </ListItem> 
          ))}
        </List>
      </div>
    )
  }
  return(
    <div>
      {selectedUser ? userData() : 'not found'}
    </div>
  )
}

export default User
