import React from 'react'
import useField from '../hooks/index'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogs'
import { setNotification } from '../reducers/notification'
import { TextField, Button } from '@material-ui/core'
import Togglable from './Togglable'

const NewBlog = (props) => {
  
  const [title, setTitle] = useField('text')
  const [author, setAuthor] = useField('text')
  const [url, setUrl] = useField('text')
  const dispatch = useDispatch()
  const blogFormRef = React.createRef()
  const handleNewBlog = async (event) => {
    event.preventDefault()

    const blog = ({
      title: title.value,
      author: author.value,
      url: url.value
    })

    try {
      dispatch(createBlog(blog))
      blogFormRef.current.toggleVisibility()
      dispatch(setNotification(`a new blog '${blog.title}' by ${blog.author} added!`))
    } catch(exception) {
      dispatch(setNotification(exception.message, 'error'))
    }
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <div style={{marginTop: 10, marginBottom: 10}}>
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <form onSubmit={handleNewBlog}>
          <div>
            <TextField label='author' {...author} />
          </div>
          <div>
            <TextField label='title' {...title} />
          </div>
          <div>
            <TextField label='url' {...url}/>
          </div>
          <Button variant='outlined' id="create" type='submit'>create</Button>
        </form>
      </Togglable>
    </div>
  )
}

export default NewBlog
