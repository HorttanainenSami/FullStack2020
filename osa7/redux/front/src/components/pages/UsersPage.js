import { useHistory } from 'react-router-dom'
import { List, Paper, Typography, ListItem, Divider, ListItemSecondaryAction } from '@material-ui/core'
import { useSelector } from 'react-redux'
const User = ({ user }) => {
  const history = useHistory()
return (
  <ListItem button onClick={() => history.push(`/users/${user.id}`)}>
  {user.username}  
  <ListItemSecondaryAction>
    <Typography variant='subtitle1'>
  {user.blogs.length === 0 ? '-- ': `${user.blogs.length} blogs`}
    </Typography>
  </ListItemSecondaryAction>
  </ListItem>
)
}
const UsersPage = () => {
  
  const users = useSelector(state => state.users)
  return(
  <div>
    <Typography variant='h4'> Users </Typography>
    <List component={Paper}>
        <ListItem>
        <Typography variant='subtitle2'> User </Typography>
        <ListItemSecondaryAction>
        <Typography variant='subtitle2'> Blogs created </Typography>
        </ListItemSecondaryAction>
        </ListItem >
        <Divider varaint='fullWidth' />
        {users.map(user => <User key={user.id} user={user} />) }
    </List>
  </div>
  )
}

export default UsersPage
