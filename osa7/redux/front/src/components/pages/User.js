import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const User = () => {
  const users = useSelector(state => state.users)
  const id = useParams().id
  const selectedUser = users.find(user => user.id === id )
  const userData = () => {
    return(
      <div>
        <h2> {selectedUser.username} </h2 >
        <br />
        <div><b> added blogs </b> </div>
        <br />
        <ul>
          {selectedUser.blogs.map(blog => <li key={blog.id}> {blog.title} </li>)}
        </ul>
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
