import { setNotification } from '../../reducers/notification'
import blogService from '../../services/blogs'
import { removeBlog, updateBlog } from '../../reducers/blogs'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const Blog = ({ user }) => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const history = useHistory()
  const id = useParams().id
  if (blogs.length===0){
    return null
  }
  const blog = blogs.find(blog => blog.id === id)
  const own = user?.id === blog.user.id 

  const handleLike = async () => {
    const likedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    const returned = await blogService.update(likedBlog)
    dispatch(updateBlog(returned))
  }

  const handleRemove = async () => {
    const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (ok) {
      await blogService.remove(id)
      history.push('/')
      dispatch(removeBlog(id))
      dispatch(setNotification('blog removed successfully'))
    }
  }
  return (
    <div className='blog'>
      <h2>
        <b>{blog.title} {blog.author} </b>
      </h2>
        <div>
          <a href={blog.url}>{blog.url}</a>
          <div>{blog.likes} likes
          {user && <button onClick={() => handleLike(blog.id)}>like</button>}
          </div>
          <div>added by {blog.user.name}</div>
          {own && <button onClick={() => handleRemove(blog.id)}>remove</button>}
      </div>
      </div>
  )
}
export default Blog
