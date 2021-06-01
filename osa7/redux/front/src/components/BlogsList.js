import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const byLikes = (b1, b2) => b2.likes - b1.likes
const BlogsList = ({ userObject }) => {
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const blogs = useSelector(state => state.blogs)

  return(
    <>
    {blogs.sort(byLikes).map(blog => 
      <div key={blog.id} style={blogStyle}>
        <Link to={`/blogs/${blog.id}`}>
          <div> {blog.title} {blog.author} </div>
        </Link>
      </div>
    )}
    </>
    )
}


export default BlogsList
