import { Link } from 'react-router-dom'
const UsersPage = ({users}) => (
  <div>
    <h2> Users </h2>
    <table>
      <tbody>
        <tr>
          <td></td>
          <td> <b>blogs created</b></td>
        </tr>
        {users.map(user => (
          <tr key={user.id}>
            <td><Link to={`/users/${user.id}`}> {user.username} </Link> </td>
            <td>{user.blogs.length}</td>
          </tr>
          )) }
      </tbody>
    </table>
  </div>
)

export default UsersPage
