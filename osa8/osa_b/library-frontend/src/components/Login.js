import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'
const LoginForm = ({ show, setError, setToken}) => {
  //import settoken
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [ login, result ] = useMutation(LOGIN,{
  onError: (error) => {
    console.log('login error')
    setError(error.message) 
}})
  useEffect(() => {
    console.log(result.data)
     if(result.data && result.data.login === null){
      setError('Wrong credentials')
    }
  },[result.data])
  useEffect(() => {
    if(result.data && result.data.login){
      setToken(result.data.login.value)
    }
  },[result.data]) 
  if (!show) {
   return null 
  }
  const submit = (event) => {
    event.preventDefault()
    login({variables: {username, password}})
    setUsername('')
    setPassword('')
  }
  return (
    <div>
      <h2> Login </h2>
      <form onSubmit={submit}>
       <div>username
          <input value={username} type='text' onChange={({target}) => setUsername(target.value)} /></div>
        <div>password
          <input value={password} type='password' onChange={({target}) => setPassword(target.value)} /></div>
        <button type='submit'>Login </button>
      </form>
    </div>
  )
}

export default LoginForm
