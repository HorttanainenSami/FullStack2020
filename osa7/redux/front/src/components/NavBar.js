import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { logoutUser } from '../reducers/login'
import { useDispatch } from 'react-redux'
import { Menu, MenuItem, Typography, IconButton, Button, AppBar, Toolbar } from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'

  const NavBar = ({user}) => {
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory()
  const open = Boolean(anchorEl)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleLogin = () => {
    handleClose()
    history.push('/login') 
  }
  const handleLogout = () => {
    dispatch(logoutUser())
    handleClose()
  }
    return(
      <>
        <AppBar position='static'>
        <Toolbar style={{display: 'flex' }}>
          <Typography variant='h4'>
            Blogs app
          </Typography>
          <Button color='inherit' component={Link} to='/'>
            home
          </Button>
          <Button color='inherit' component={Link} to='/users'>
            users
          </Button>
        <IconButton 
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit" style={{marginLeft: 'auto'}}>
          <div style = {{ display: 'flex', flexDirection: 'column'}}> 
            <AccountCircle /> 
          </div>
          <div>
            <Typography variant='caption' >
      { user ?`${user.username} logged in` :'Log in'}
            </Typography>
          </div>
        </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
          >
          { user ? <MenuItem onClick={handleLogout}> Logout </MenuItem>:
            <MenuItem onClick={handleLogin}>Login </MenuItem>}
          </Menu>
        </Toolbar>
        </AppBar>
      </>
    )
  }
export default NavBar
