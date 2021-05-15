import React, { useState } from 'react'

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const handleLogin = (event) => {
    event.preventDefault()

    const user = { username, password }
    login(user)
    setUsername('')
    setPassword('')
  }
  return(
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id='username'
            type="text"
            name="Username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id='password'
            type="password"
            name="Password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='login-btn' type="submit">login</button>
      </form>
    </div>
  )
}
export default LoginForm
