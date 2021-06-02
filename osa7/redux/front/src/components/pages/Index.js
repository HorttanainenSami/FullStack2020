import React from 'react'
import NewBlog from '../NewBlog'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const byLikes = (b1, b2) => b2.likes - b1.likes

const BlogsList = () => {

  const blogs = useSelector(state => state.blogs)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

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

const IndexPage = ({ user }) => {
  return (
    <div>
      {user && <NewBlog /> }
      <BlogsList />
    </div>
  )
}
export default IndexPage

