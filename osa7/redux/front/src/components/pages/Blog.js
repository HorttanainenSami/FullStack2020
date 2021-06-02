import { setNotification } from '../../reducers/notification'
import blogService from '../../services/blogs'
import { removeBlog, updateBlog, commentBlog } from '../../reducers/blogs'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import useField from '../../hooks/index'

const Blog = ({ user }) => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const history = useHistory()
  const [comment, resetComment] = useField('text')
  const id = useParams().id
  if (blogs.length===0){
    return null
  }
  const blog = blogs.find(blog => blog.id === id)
  const own = user?.id === blog.user.id 

  const handleLike = async () => {
    const likedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    const returned = await blogService.update(likedBlog)
    console.log(returned)
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
  const handleComment = () =>  {
   const messageObject = {
     message: comment.value,
  }
    resetComment()
    dispatch(commentBlog(blog.id, messageObject))
  }
  console.log(blog.comments)
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
      <h2> Comments </h2>
      <input {...comment} />
      <button onClick={handleComment}>add comment</button>
      {blog.comments.length === 0 ?<div>no comments</div>: 
        <ul>
          {blog.comments.map(comment => <li key={comment.id}> {comment.message} </li>)}
        </ul>}
   </div>
  )
}
export default Blog
