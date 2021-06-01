import React from 'react'
import Togglable from './Togglable'
import NewBlog from './NewBlog'
const NewBlogForm = ({ user, handleLogout }) => {
  const blogFormRef = React.createRef()
  return(
    <div>
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <NewBlog blogFormRef={blogFormRef} />
      </Togglable>
    </div>
  )
}
export default NewBlogForm
