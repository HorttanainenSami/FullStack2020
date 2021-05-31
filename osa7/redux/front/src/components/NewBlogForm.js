import React from 'react'
import Togglable from './Togglable'
import Notification from './Notification'
import NewBlog from './NewBlog'
const NewBlogForm = ({ user, handleLogout }) => {
  const blogFormRef = React.createRef()
  return(
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {user.username} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <NewBlog blogFormRef={blogFormRef} />
      </Togglable>
    </div>
  )
}
export default NewBlogForm
