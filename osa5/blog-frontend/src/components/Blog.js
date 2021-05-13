import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, removeFromServer, increase, user }) => {
  const [visible, setVisible] = useState(false)
  const showWhenVisible ={ display: visible ? '' : 'none' }
  const style = {
    borderStyle: 'solid',
    padding: 10,
    margin: 10,
  }
  const increaseLikes = (event) => {
    event.preventDefault()
    console.log(`blog with id: ${blog.id} likes increaced to ${blog.likes + 1}`)
    increase(blog)
  }
  const deleteBlog = () => {
    const result = window.confirm(`Removing blog ${blog.title} by ${blog.author}`)
    result && removeFromServer(blog.id)
  }
  return(
    <li>
      <div style = {style}>
        <div>
          {blog.title} {blog.author} <button onClick={() => setVisible(!visible)}> {visible ? 'hide' : 'view'} </button>
        </div>

        <div style = {showWhenVisible}>
          <div>{blog.url}</div>
          <div>likes {blog.likes} <button onClick={increaseLikes}> like</button></div>
          <div>{blog.user.username}</div>
          {blog.user.id === user.id && <button onClick={deleteBlog}>delete</button>}
        </div>

      </div>
    </li>
  )
}
Blog.propTypes = {
  removeFromServer: PropTypes.func.isRequired,
  increase: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blog
