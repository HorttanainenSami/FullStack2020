import React from 'react'
import useField from '../hooks/index'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogs'
import { setNotification } from '../reducers/notification'

const NewBlog = (props) => {
  
  const [title, setTitle] = useField('text')
  const [author, setAuthor] = useField('text')
  const [url, setUrl] = useField('text')
  const dispatch = useDispatch()
  const handleNewBlog = async (event) => {
    event.preventDefault()

    const blog = ({
      title: title.value,
      author: author.value,
      url: url.value
    })

    try {
      const newBlog = await blogService.create(blog)
      props.blogFormRef.current.toggleVisibility()
      dispatch(createBlog(newBlog))
      dispatch(setNotification(`a new blog '${newBlog.title}' by ${newBlog.author} added!`))
    } catch(exception) {
      dispatch(setNotification(exception.message, 'error'))
    }
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          title
          <input {...title} />
        </div>
        <div>
          url
          <input {...url}/>
        </div>
        <button id="create">create</button>
      </form>
    </div>
  )
}

export default NewBlog
