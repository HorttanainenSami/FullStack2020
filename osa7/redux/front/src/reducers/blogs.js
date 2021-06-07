import blogService from '../services/blogs'

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INITIALIZE_BLOGS',
      data: blogs
    })
  }
}
export const updateBlog = (blog) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(blog)
    await dispatch({
      type: 'UPDATE_BLOG',
      data: updatedBlog
    })
  }
}
export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    await dispatch({ 
    type: 'NEW_BLOG',
    data: newBlog
    })
  }
}
export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    await dispatch({
      type: 'REMOVE_BLOG',
      data: id
    })
  }
}
export const commentBlog = (id, message) => {
  return async dispatch => {
    const comment = await blogService.createComment(id, message)
    await dispatch({
      type: 'COMMENT_BLOG',
      data: comment
    })
  }
}
const blogReducer = (state=[], action) => {
  switch(action.type) {
    case 'UPDATE_BLOG':
      return state.map(blog => blog.id === action.data.id ? action.data : blog)
    case 'INITIALIZE_BLOGS':
      return action.data
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'REMOVE_BLOG':
      return state.filter(blog => blog.id !== action.data)
    case 'COMMENT_BLOG':
      const commentedBlog = state.find(blog => blog.id === action.data.blog)
      commentedBlog.comments = commentedBlog.comments.concat(action.data) 
      return state.map(blog => blog.id === commentedBlog.id ? commentedBlog : blog)
    default:
      return state
  }
}


export default blogReducer
