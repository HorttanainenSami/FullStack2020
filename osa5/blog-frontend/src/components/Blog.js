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
    const newBlog = {
      user: blog.user,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes:blog.likes + 1,
      id: blog.id,
    }
    increase(newBlog)
  }
  const deleteBlog = () => {
    const result = window.confirm(`Removing blog ${blog.title} by ${blog.author}`)
    result && removeFromServer(blog.id)
  }
  return(
    <li id ={blog.title.replace(/ /g,'_')}>
      <div style = {style}>
        <div className='content'>
          {blog.title} {blog.author} <button onClick={() => setVisible(!visible)}> {visible ? 'hide' : 'view'} </button>
        </div>

        <div className='togglableContent' style = {showWhenVisible}>
          <div>{blog.url}</div>
          <div>likes {blog.likes} <button id = 'like-btn' onClick={increaseLikes}> like</button></div>
          <div>{blog.user.username}</div>
          {blog.user.id === user.id && <button id='delete-btn' onClick={deleteBlog}>delete</button>}
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
