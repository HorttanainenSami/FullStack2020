import LoginForm from './LoginForm'
import { Link } from 'react-router-dom'
import { logoutUser } from '../reducers/login'
import { useDispatch } from 'react-redux'
  const NavBar = ({user}) => {
  const dispatch = useDispatch()
    const style = {
      backgroundColor: 'lightgrey',
      padding: 10,
    }
    console.log(user)
    const logoutForm = () => (
      <>
      <span><b> {user.username} logged in</b></span>
        <button 
          onClick={() => dispatch(logoutUser())}>
          logout
        </button>
      </>
    )


    return(
      <div style={style}>
          <Link to='/blogs'>
            <span> Blogs </span>
          </Link>
          <Link to='/users'>
            <span> Users </span>
          </Link>
      {user ? logoutForm():<LoginForm /> }
      </div>
    )
  }
export default NavBar
