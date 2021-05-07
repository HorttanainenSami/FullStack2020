import React, { useState } from 'react'

const Blog = ({ blog, increase }) => {
  const [visible, setVisible] = useState(false)
  const showWhenVisible ={ display: visible ? '' : 'none' }
  const style = {
    borderStyle: 'solid',
    padding: 10,
    margin: 10,
  }
  const increaseLikes = (event) => {
    event.preventDefault()
    console.log(`blog with id: ${blog.id} likes increaded to ${blog.likes + 1}`)
    increase(blog)

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
        </div>

      </div>
    </li>
  )
}

export default Blog
