import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notification'
import blogService from '../services/blogs'
import { removeBlog, initializeBlogs, updateBlog } from '../reducers/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleRemove, user }) => {
  const own = user?.id === blog.user.id 
  const [visible, setVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const label = visible ? 'hide' : 'view'
  return (
    <div style={blogStyle} className='blog'>
      <div>
        <i>{blog.title}</i> by {blog.author} <button onClick={() => setVisible(!visible)}>{label}</button>
      </div>
      {visible&&(
        <div>
          <div>{blog.url}</div>
          <div>likes {blog.likes}
          {user && <button onClick={() => handleLike(blog.id)}>like</button>}
          </div>
          <div>{blog.user.name}</div>
          {own && <button onClick={() => handleRemove(blog.id)}>remove</button>}
        </div>
      )}
    </div>
  )
}

const byLikes = (b1, b2) => b2.likes - b1.likes
const BlogsList = ({ userObject }) => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const handleLike = async (id) => {
    const blogToLike = blogs.find(b => b.id === id)
    const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1, user: blogToLike.user.id }
    const returned = await blogService.update(likedBlog)
    dispatch(updateBlog(returned))
  }

  const handleRemove = async (id) => {
    const blogToRemove = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    if (ok) {
      await blogService.remove(id)
      dispatch(removeBlog(id))
      dispatch(setNotification('blog removed successfully'))
    }
  }

  return(
    <>
    {blogs.sort(byLikes).map(blog => 
      <Blog key={blog.id}
        blog={blog}
        handleLike={handleLike}
        handleRemove={handleRemove}
        user={user}
        />
    )}
    </>
    )
}
Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
}

export default BlogsList
